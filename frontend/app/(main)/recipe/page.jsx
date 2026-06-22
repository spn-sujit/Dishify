"use client";
import { AlertCircle, ArrowLeft, BookmarkCheck, Check, CheckCircle2, ChefHat, Clock, Download, Flame, Lightbulb, Loader2, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import useFetch from "../../../hooks/use-fetch";
import {
  getOrGenerateRecipe,
  removeRecipeFromCollection,
  saveRecipeToCollection,
} from "../../../actions/recipe.actions";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { ClockLoader } from "react-spinners";
import Image from "next/image";
import { Badge } from "../../../components/ui/badge";
import ProLockedSection from "../../../components/ui/ProLockedSection";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RecipePdf from "../../../components/ui/RecipePdf";

function RecipeContent() {
  const searchParams = useSearchParams();
  const recipeName = searchParams.get("cook");
  const [recipe, setRecipe] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const router=useRouter();
  const {
    loading: loadingRecipe,
    data: recipeData,
    fn: fetchRecipe,
  } = useFetch(getOrGenerateRecipe);
  const {
    loading: saving,
    data: saveData,
    fn: saveToCollecton,
  } = useFetch(saveRecipeToCollection);
  const {
    loading: removing,
    data: removeData,
    fn: removeFromCollection,
  } = useFetch(removeRecipeFromCollection);
  useEffect(() => {
    if (recipeName && !recipe) {
      const formData = new FormData();
      formData.append("recipeName", recipeName);
      fetchRecipe(formData);
    }
  }, [recipeName]);
  useEffect(() => {
    if (recipeData?.success) {
      setRecipe(recipeData.recipe);
      setRecipeId(recipeData.recipeId);
      setIsSaved(recipeData.isSaved);
      if (recipeData.fromDatabase) {
        toast.success("Recipe loaded from database");
      } else {
        toast.success("New recipe generated and saved!");
      }
    }
  }, [recipeData]);
  const handleToggleSave=async()=>{
    if(!recipeId) return;
    const formData=new FormData();
    formData.append("recipeId",recipeId);
    if(isSaved){
      await removeFromCollection(formData);
    }
    else{
      await saveToCollecton(formData);
    }
  }
  useEffect(()=>{
    if(saveData?.success){
      if(saveData.alreadySaved){
        toast.info("Recipe is already in your collection");
      }
      else{
        setIsSaved(true);
        toast.success("Recipe saved to your collection");
      }
    }
  },[saveData]);
  useEffect(()=>{
if(removeData?.success){
  setIsSaved(false);
  toast.success("Recipe removed from collection");
}
  },[removeData]);
  console.log(recipe);
  if (!recipeName) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white border border-stone-200/80 rounded-3xl p-8 shadow-xl shadow-stone-200/40 space-y-6 flex flex-col items-center relative overflow-hidden group animate-[fadeIn_0.5s_ease-out]">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-orange-400 via-orange-500 to-amber-500 animate-[pulse_2s_infinite]" />

          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shadow-3xs animate-[bounce_2s_infinite] group-hover:scale-110 transition-transform duration-300">
            <AlertCircle className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5">
              No Recipe Specified
            </h2>
            <p className="text-sm text-stone-500 font-medium max-w-xs mx-auto leading-relaxed">
              Please select a recipe from the dashboard
            </p>
          </div>

          <div className="pt-2 w-full max-w-xs">
            <Link href="/dashboard" className="w-full block">
              <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold h-12 px-6 rounded-2xl shadow-md hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer text-sm tracking-wide border border-neutral-800 active:scale-[0.95] hover:scale-[1.02]">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (loadingRecipe === null || loadingRecipe) {
    return (
<div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-orange-50">
  <div className="max-w-md w-full text-center space-y-8 flex flex-col items-center">
    <div className="animate-spin [animation-duration:2.5s] filter drop-shadow-sm">
      <ClockLoader size={56} color="#ea580c" />
    </div>

    <div className="space-y-3">
      <h2 className="text-4xl font-black text-stone-900 tracking-tight sm:text-5xl">
        Preparing Your Recipe
      </h2>
      <p className="text-lg text-stone-600 font-bold max-w-sm mx-auto leading-relaxed tracking-wide">
        Our AI chef is crafting detailed instructions for{" "}
        <span className="text-orange-600 font-black capitalize">
          {recipeName}
        </span>
      </p>
    </div>

    <div className="w-full max-w-sm pt-4">
      <div className="h-1.5 w-full bg-stone-200 overflow-hidden relative rounded-full">
        <div className="absolute left-0 top-0 h-full bg-orange-600 rounded-full animate-slow-fill w-[85%]" />
      </div>
    </div>
  </div>
</div>
    );
  }
  if(loadingRecipe===false && !recipe){
    return(
<div className="min-h-[85vh] flex flex-col items-center justify-center p-6 bg-orange-50">
  <div className="max-w-md w-full text-center space-y-8 flex flex-col items-center relative group">
    
    <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-rose-100/60 transition-transform duration-500 group-hover:scale-105">
      <div className="relative z-10 text-rose-600 drop-shadow-[0_4px_10px_rgba(225,29,72,0.15)]">
        <AlertCircle className="w-12 h-12 stroke-[2.2]" />
      </div>
    </div>
    
    <div className="space-y-4">
      <h2 className="text-3xl font-black text-stone-900 tracking-tight sm:text-4xl">
        Failed to load recipe
      </h2>
      
      <p className="text-base text-stone-600 font-semibold max-w-xs mx-auto leading-relaxed">
        Something went wrong while loading the recipe. Please try again
      </p>
    </div>

    <div className="flex items-center gap-4 pt-2">
      <Button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold h-11 px-5 rounded-2xl shadow-sm transition-all cursor-pointer text-sm tracking-wide border border-stone-900 active:scale-[0.97]"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        Go Back
      </Button>
      
      <Button 
        onClick={() => window.location.reload()} 
        className="bg-transparent hover:bg-orange-100/50 text-orange-600 font-bold h-11 px-5 rounded-2xl transition-all cursor-pointer text-sm tracking-wide border border-orange-200 active:scale-[0.97]"
      >
        Retry
      </Button>
    </div>
  </div>
</div>
    );
  }
  return (
 <div className="min-h-screen bg-orange-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl mx-auto space-y-8">
    
    <div className="flex flex-col gap-6">
      <Link 
        href="/dashboard" 
        className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 font-bold text-sm tracking-wide self-start transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      {recipe.imageUrl && (
        <div className="relative w-full h-[250px] sm:h-[400px] rounded-3xl overflow-hidden shadow-md shadow-orange-100">
          <Image 
            src={recipe.imageUrl}
            unoptimized
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>
      )}

      <div className="space-y-4">
  <div className="flex flex-wrap gap-2">
    <Badge className="bg-orange-100 text-orange-700 font-black px-3 py-1 rounded-xl text-xs uppercase tracking-wider border border-orange-200/40">
      {recipe.cuisine}
    </Badge>
    <Badge className="bg-stone-200/60 text-stone-700 font-black px-3 py-1 rounded-xl text-xs uppercase tracking-wider">
      {recipe.category}
    </Badge>
  </div>

  <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight capitalize">
    {recipe.title}
  </h1>

  <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed max-w-3xl">
    {recipe.description}
  </p>

  <div className="flex flex-wrap items-center gap-6 pt-2 text-stone-600 font-bold text-sm">
    <div className="flex items-center gap-2">
      <Clock className="w-5 h-5 text-orange-500 stroke-[2.2]" />
      <span>{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins total</span>
    </div>
    <div className="flex items-center gap-2">
      <Users className="w-5 h-5 text-orange-500 stroke-[2.2]" />
      <span>{recipe.servings} servings</span>
    </div>
    {recipe.nutrition?.calories && (
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-500 stroke-[2.2]" />
        <span>{recipe.nutrition.calories} cal/serving</span>
      </div>
    )}
  </div>

  <div className="flex flex-wrap items-center gap-4 pt-4">
    <Button
      onClick={handleToggleSave}
      disabled={saving || removing}
      className={`flex items-center gap-2 font-black h-12 px-6 rounded-2xl shadow-sm transition-all cursor-pointer text-sm tracking-wide text-white active:scale-[0.97] disabled:opacity-80 disabled:cursor-not-allowed shrink-0 ${
        isSaved ? "bg-emerald-600 hover:bg-emerald-700 border border-emerald-600" : "bg-orange-600 hover:bg-orange-700 border border-orange-600"
      }`}
    >
      {saving || removing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
          {saving ? "Saving..." : "Removing..."}
        </>
      ) : (
        <>
          <BookmarkCheck className="w-4 h-4 stroke-[2.5]" />
          {isSaved ? "Saved to Collection" : "Save to Collection"}
        </>
      )}
    </Button>

    <PDFDownloadLink
      document={<RecipePdf recipe={recipe} />}
      fileName={`${recipe.title.toLowerCase().replace(/\s+/g, "-")}-recipe.pdf`}
      className="inline-block shrink-0"
    >
      {({ loading }) => (
        <Button
          disabled={loading}
          className="flex items-center gap-2 font-black h-12 px-6 rounded-2xl shadow-sm transition-all cursor-pointer text-sm tracking-wide text-white bg-stone-900 hover:bg-stone-800 border border-stone-900 active:scale-[0.97] disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 stroke-[2.5]" />
              Download Recipe PDF
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  </div>
</div>
    </div>

    <div className="grid lg:grid-cols-3 gap-8 pt-4">
      <div className="lg:col-span-1 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2.5">
            <ChefHat className="w-6 h-6 text-orange-500 stroke-[2.2]" />
            Ingredients
          </h2>
          
          <div className="space-y-6">
            {Object.entries(
              recipe.ingredients.reduce((acc, ing) => {
                const cat = ing.category;
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(ing);
                return acc;
              }, {})
            ).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest">
                  {category}
                </h3>
                <ul className="space-y-2.5">
                  {items.map((ingredient, i) => (
                    <li key={i} className="flex items-center justify-between py-2 border-b border-stone-200/60 text-sm font-semibold text-stone-700">
                      <span>{ingredient.item}</span>
                      <span className="text-orange-600 font-bold bg-orange-100/40 px-2 py-0.5 rounded-lg text-xs border border-orange-200/20">
                        {ingredient.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
          {recipe.nutrition && (
  <div className="space-y-4 pt-4 border-t border-stone-200/60">
    <h3 className="text-base font-black text-stone-900 tracking-tight">
      Nutrition (per serving)
    </h3>
  
   <ProLockedSection 
     isPro={recipeData.isPro }
     lockText="Nutrition info is Pro-only"

   >
     <div className="grid grid-cols-2 gap-3 text-center w-full">
      <div className="bg-white border border-orange-200/40 rounded-2xl p-4 shadow-3xs">
        <div className="text-base font-black text-orange-700">
          {recipe.nutrition.calories}
        </div>
        <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mt-0.5">
          Calories
        </div>
      </div>
      <div className="bg-white border border-stone-200/60 rounded-2xl p-4 shadow-3xs">
        <div className="text-base font-black text-stone-800">
          {recipe.nutrition.protein || recipe.nutrition.protien}
        </div>
        <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mt-0.5">
          Protein
        </div>
      </div>
      <div className="bg-white border border-stone-200/60 rounded-2xl p-4 shadow-3xs">
        <div className="text-base font-black text-stone-800">
          {recipe.nutrition.carbs}
        </div>
        <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mt-0.5">
          Carbs
        </div>
      </div>
      <div className="bg-white border border-stone-200/60 rounded-2xl p-4 shadow-3xs">
        <div className="text-base font-black text-stone-800">
          {recipe.nutrition.fat}
        </div>
        <div className="text-[10px] font-black text-stone-400 uppercase tracking-wider mt-0.5">
          Fat
        </div>
      </div>
    </div>
   </ProLockedSection>
  </div>
)}
</div>

      <div className="lg:col-span-2 space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Step-by-Step Instructions
          </h2>
          
          <div className="relative">
            {recipe.instructions.map((step, index) => (
              <div
                key={index}
                className={`relative pl-10 pb-8 ml-4 ${
                  index !== recipe.instructions.length - 1
                    ? "border-l-2 border-orange-200"
                    : ""
                }`}
              >
                <div className="absolute -left-4.25 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-black shadow-sm ring-4 ring-orange-50">
                  {step.step}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-stone-900 tracking-tight capitalize">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed">
                    {step.instruction}
                  </p>
                  
                  {step.tip && (
                    <div className="mt-3 p-3.5 bg-white border border-orange-200/50 rounded-2xl shadow-3xs">
                      <p className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-stone-700 leading-relaxed">
                        <Lightbulb className="w-4 h-4 text-orange-500 shrink-0 stroke-[2.5] mt-0.5" />
                        <span>
                          <strong className="font-black text-orange-700 mr-1">Pro Tip:</strong>
                          {step.tip}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 p-5 bg-[#f0fdf4] border border-emerald-200/60 rounded-3xl mt-4 shadow-3xs">
  <div className="text-emerald-700 bg-white p-2.5 rounded-2xl border border-emerald-100 shrink-0 shadow-3xs">
    <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
  </div>
  <div>
    <h3 className="text-lg font-black text-stone-900 tracking-tight">
      You&apos;re all done!
    </h3>
    <p className="text-sm font-semibold text-stone-600 leading-relaxed mt-0.5">
      Plate your masterpiece and enjoy your delicious{" "}
      <span className="font-bold text-orange-600 capitalize">
        {recipe.title}
      </span>
    </p>
  </div>
</div>
        </div>

        {recipe.tips && recipe.tips.length > 0 && (
          <div className="p-6 bg-white border border-orange-200/70 rounded-none space-y-4 shadow-3xs">
            <div className="flex items-center gap-2">
              <span className="text-[#ea580c] text-lg">💡</span>
              <h2 className="text-xl font-bold text-[#1c1917]">
                Chef&apos;s Tips & Tricks
              </h2>
              {!recipeData.isPro && (
                <span className="text-[10px] font-black tracking-widest uppercase bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-0.5 rounded-md shadow-3xs animate-pulse ml-1">
                  PRO
                </span>
              )}
            </div>
            
            <div className="w-full">
              <ProLockedSection 
                isPro={recipeData.isPro }
                lockText="Chef tips are Pro-only"
                ctaText="Unlock Pro Tips"
              >
                <ul className="space-y-4">
                  {recipe.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-normal text-[#44403c] leading-relaxed">
                      <div className="shrink-0 mt-1 p-0.5 overflow-visible flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#ea580c] stroke-[3]" />
                      </div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </ProLockedSection>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
}

export default function RecipePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl text-center py-20">
            <Loader2 className="w-16 h-16 text-orange-600 animate-spin mx-auto mb-6" />
            <p className="text-stone-600">Loading recipe...</p>
          </div>
        </div>
      }
    >
      <RecipeContent />
    </Suspense>
  );
}
