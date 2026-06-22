"use client";
import React, { useEffect } from "react";
import useFetch from "../../../../hooks/use-fetch";
import { getRecipesByPantryIngredients } from "../../../../actions/recipe.actions";
import Link from "next/link";
import {
  ArrowLeft,
  ChefHat,
  Loader2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import PricingModel from "../../../../components/ui/PricingModel";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import RecipeCard from "../../../../components/ui/RecipeCard";

const PantryRecipesPage = () => {
  const {
    loading,
    data: recipesData,
    fn: fectchSuggestions,
  } = useFetch(getRecipesByPantryIngredients);

  useEffect(() => {
    fectchSuggestions();
  }, []);

  const recipes = recipesData?.recipes || [];
  const ingredientsUsed = recipesData?.ingredientsUsed || "";
  return (
    <div className="min-h-screen bg-orange-50-50 py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/pantry"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-orange-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Pantry
        </Link>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-800 border border-neutral-700 rounded-xl shrink-0">
              <ChefHat className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                What Can I Cook?
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm">
                AI recipe suggestions based on your ingredients
              </p>
            </div>
          </div>

          {recipesData !== undefined && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-semibold text-white tracking-wide shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 fill-orange-400/20 animate-pulse" />
              {recipesData.recommendationsLimit === "unlimited" ? (
                <span>Pro Plan Active</span>
              ) : (
                <span>Standard Plan</span>
              )}
            </div>
          )}
        </div>

        {ingredientsUsed && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
              Ingredients
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ingredientsUsed.split(",").map((item, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-200/70 border border-neutral-300/40 text-neutral-800 text-xs font-medium px-2.5 py-1 rounded-md"
                >
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center text-center py-16 space-y-3">
            <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
            <div className="space-y-0.5">
              <h2 className="text-sm font-semibold text-neutral-900">
                Generating Recipes...
              </h2>
              <p className="text-neutral-400 text-xs max-w-xs">
                Our AI chef is building customized recipe configurations.
              </p>
            </div>
          </div>
        )}
        {!loading && recipes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                  Recipe Suggestions
                </h2>
              </div>
              <Badge className="bg-orange-50 text-orange-700 border border-orange-300 px-2.5 py-0.5 text-xs font-semibold rounded-md">
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} variant="pantry" />
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={() => fectchSuggestions(new FormData())}
                disabled={loading}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white font-semibold h-11 px-6 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 text-sm tracking-wide border border-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400/10" />
                    <span>Get New Suggestions</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        {!loading && recipes.length === 0 && recipesData?.success === false && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-orange-50 rounded-2xl min-h-85 space-y-6">
            <div className="relative flex flex-col items-center justify-center h-24 w-24">
              <div className="text-7xl animate-bounce animation-duration-[2s]">
                🍳
              </div>
              <div className="absolute bottom-1 w-14 h-1.5 bg-neutral-900/10 rounded-full blur-xs animate-pulse animation-duration-[2s]" />
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-base font-bold text-neutral-950 tracking-tight">
                Your Pantry is Empty
              </h3>
              <p className="text-neutral-500 text-xs sm:text-sm font-medium leading-relaxed">
                Add ingredients to your pantry first so we can suggest delicious
                recipes you can make!
              </p>
            </div>
          </div>
        )}
        {!loading && recipesData === undefined && (
          <div className="bg-amber-50 border border-neutral-200 p-8 text-center rounded-2xl max-w-md mx-auto shadow-xs flex flex-col items-center justify-center">
            <div className="bg-neutral-950 w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-sm">
              <Sparkles className="w-7 h-7 text-orange-400 fill-orange-400/10 animate-pulse" />
            </div>

            <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-1.5">
              Monthly Limit Reached
            </h3>

            <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-medium">
              You&apos;ve used all your AI recipe recommendations this month.
              Upgrade to Pro for unlimited suggestions!
            </p>

            <PricingModel>
              <span className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold h-11 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 text-sm tracking-wide border border-neutral-800">
                <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400/10" />
                Upgrade to Pro
              </span>
            </PricingModel>
          </div>
        )}
      </div>
    </div>
  );
};

export default PantryRecipesPage;
