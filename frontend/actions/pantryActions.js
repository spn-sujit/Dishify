"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkUser } from "../lib/checkUser";
import { freePantryScans, proTierLimit } from "../lib/arcjet";
import { request } from "@arcjet/next";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function scanPantryImage(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const isPro = user.subscriptionTier === "pro";
    const arcjetClient = isPro ? proTierLimit : freePantryScans;

    const req = await request();

    const decision = await arcjetClient.protect(req, {
      userId: user.clerkId,
      requested: 1,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error(
          `Monthly scan limit reached. ${
            isPro
              ? "Please contact support if you need more scans."
              : "Upgrade to Pro for unlimited scans!"
          }`,
        );
      }
      throw new Error("Request denied by security systems.");
    }
    const imageFile = formData.get("image");
    if (!imageFile) {
      throw new Error("No image provided");
    }
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });
    const prompt = `You are a professional chef and highly accurate computer vision system specializing in ingredient recognition. Analyze the provided image of a pantry or refrigerator compartment with extreme precision.

Your objective is to identify all visible food ingredients and output a single, raw JSON array containing your findings. 

Strict Output Structure:
[
  {
    "name": "Specific Ingredient Name",
    "quantity": "Estimated Quantity with Unit",
    "confidence": 0.95
  }
]

Operational Constraints:
1. ONLY return the raw JSON array. Do not wrap the output in markdown code blocks (such as \`\`\`json). Do not include introductory text, conversational filler, or explanations. 
2. Isolate individual food ingredients only. Ignore physical infrastructure like plastic containers, glass jars, storage bins, shelving, wraps, or kitchen utensils.
3. Use short, simple, lowercase ingredient names optimized for recipe search. Avoid brand names, packaging descriptions, sizes, colors, and overly specific variants unless absolutely necessary. Examples:

* "tomato" instead of "Cherry Tomatoes"
* "milk" instead of "Whole Milk"
* "onion" instead of "Red Onion"
* "cheese" instead of "Cheddar Cheese"
* "chicken" instead of "Boneless Skinless Chicken Breast"

The "name" field should contain only 1-3 common words and be easy to use as a recipe search keyword.
4. Provide a realistic quantity assessment based on visible scale and volume within the space (e.g., "500g", "3 whole items", "1/2 carton").
5. Assign a confidence level score between 0.70 and 1.00. Completely omit any observed items where your visual recognition confidence drops below 0.70.
6. Cap the output array at a maximum of 20 unique ingredients.
7. The "name" field must be a concise search-friendly ingredient name in lowercase, containing at most 3 words.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: imageFile.type,
          data: base64Image,
        },
      },
    ]);
    const response =  result.response;
    const text = response.text();
    let ingredients;
    try {
      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      ingredients = JSON.parse(cleanText);
    } catch (error) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Failed to parse ingredients. Please try again.");
    }
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      throw new Error(
        "No ingredients detected in the image. Please try a clearer photo.",
      );
    }
    return {
      success: true,
      ingredients: ingredients.slice(0, 20),
      scansLimit: isPro ? "unlimited" : 10,
      message: `Found ${ingredients.length} ingredients!`,
    };
  } catch (error) {
    console.error("Error scanning pantry:", error);
    throw new Error(error.message || "Failed to scan image");
  }
}
export async function saveToPantry(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const ingredientsJSON = formData.get("ingredients");
    if (!ingredientsJSON) {
      throw new Error("No ingredients provided");
    }
    const ingredients = JSON.parse(ingredientsJSON);
    if (!ingredients || ingredients.length === 0) {
      throw new Error("No ingredients to save");
    }
    const savedItems = [];
    for (const ingredient of ingredients) {
      const response = await fetch(`${STRAPI_URL}/api/pantry-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name: ingredient.name,
            quantity: ingredient.quantity,
            imageUrl: "",
            owner: user.id,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        savedItems.push(data.data);
      }
    }
    return {
      success: true,
      savedItems,
      message: `Saved ${savedItems.length} items to your pantry!`,
    };
  } catch (error) {
    console.error("Error saving to pantry:", error);
    throw new Error(error.message || "Failed to save items");
  }
}
export async function addPantryItemManually(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    const name = formData.get("name");
    const quantity = formData.get("quantity");
    if (!name || !quantity) {
      throw new Error("Name and quantity are required");
    }
    const response = await fetch(`${STRAPI_URL}/api/pantry-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          name: name.trim(),
          quantity: quantity.trim(),
          imageUrl: "",
          owner: user.id,
        },
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to add item:", errorText);
      throw new Error("Failed to add item to pantry");
    }
    const data = await response.json();
    return {
      success: true,
      item: data.data,
      message: "Item added successfully!",
    };
  } catch (error) {
    console.error("Error adding item manually:", error);
    throw new Error(error.message || "Failed to add item");
  }
}
export async function getPantryItems() {
    try {
        const user=await checkUser();
        if(!user){
            throw new Error("User not authenticated");
        }
        const response=await fetch(`${STRAPI_URL}/api/pantry-items?filters[owner][id][$eq]=${user.id}&sort=createdAt:desc`,{
            headers:{
                Authorization:`Bearer ${STRAPI_API_TOKEN}`
            },
            cache:"no-store"
        });
        if(!response.ok){
            throw new Error("Failed to fetch pantry items");
        }
        const data=await response.json();
        const isPro=user.subscriptionTier==="pro";
        return{
            success:true,
            items:data.data,
            scansLimit:isPro?"unlimited":10,
        }
    } catch (error) {
        console.error("Error fetching pantry:",error);
        throw new Error(error.message || "Failed to load pantry.");
    }
}
export async function deletePantryItems(formData) {
    try {
        const user=await checkUser();
        if(!user){
            throw new Error("User not authenticated");
        }
        const itemId=formData.get("itemId");
        const response=await fetch(`${STRAPI_URL}/api/pantry-items/${itemId}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${STRAPI_API_TOKEN}`,
            },
        });
        if(!response.ok){
            throw new Error("Failed to delete item");
        }
        return{
            success:true,
            message:"Item removed from pantry",
        }
    } catch (error) {
        console.error("Error deleting item:",error);
        throw new Error(error.message || "Failed to delete item");
    }
}
export async function  updatePantryItems(formData) {
    try {
        const user=await checkUser();
        if(!user){
            throw new Error("User not authenticated");
        }
        const itemId=formData.get("itemId");
        const name=formData.get("name");
        const quantity=formData.get("quantity");
        const response=await fetch(`${STRAPI_URL}/api/pantry-items/${itemId}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${STRAPI_API_TOKEN}`,
            },
            body:JSON.stringify({
                data:{
                    name,
                    quantity,
                },
            }),
        });
        if(!response.ok){
            throw new Error("Failed to update item");
        }
        const data=await response.json();
        return{
            success:true,
            item:data.data,
            message:"Item updated successfully",
        };
    } catch (error) {
        console.error("Error updating item:",error);
        throw new Error(error.message || "Failed to update item");
    }
}
