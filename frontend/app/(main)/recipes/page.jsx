"use client"
import { Bookmark, ChefHat, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import useFetch from '../../../hooks/use-fetch'
import { getSavedRecipe } from '../../../actions/recipe.actions'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import RecipeCard from '../../../components/ui/RecipeCard'

const SavedRecipePage = () => {
const {loading,data:recipesData,fn:fetchSavedRecipes}=useFetch(getSavedRecipe);

useEffect(()=>{
  fetchSavedRecipes();
},[]);
const recipes=recipesData?.recipes || [];
  return (
    <div className="min-h-[75vh] bg-orange-50 px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-4xl space-y-10">
        <div className="flex items-center gap-3.5 pb-2">
            <Bookmark className="w-8 h-8 text-orange-600 stroke-[2.5]" />
            <div>
                <h1 className="text-3xl font-black text-stone-900 tracking-tight sm:text-4xl">My Saved Recipes</h1>
                <p className="text-sm font-semibold text-stone-600 mt-0.5">Your personal collection of favorite recipes</p>
            </div>
        </div>
         {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
         <Loader2 className="w-8 h-8 text-orange-600 animate-spin stroke-[2.5]" />
         <p className="text-base font-black text-stone-600 tracking-wide animate-pulse">Loading your saved recipes...</p>
        </div>
    )}
    {!loading && recipes.length>0 && (
       <div className="flex flex-col gap-4 w-full">
    {recipes.map((recipe)=>(
       <RecipeCard
       key={recipe.documentId}
       recipe={recipe}
       variant='list'
       />
    ))}
</div>
    )}
     {!loading && recipes.length===0 && (
        <div className="flex flex-col items-center text-center py-16 px-4 max-w-md mx-auto space-y-6">
            <div className="animate-spin animation-duration-[4s]">
                <Bookmark className="w-14 h-14 text-orange-600/40 stroke-[1.8]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-stone-900 tracking-tight">No Saved Recipes Yet</h3>
              <p className="text-base text-stone-600 font-semibold leading-relaxed">Start exploring recipes and save your favourites to built your personal cookbook!</p>
            </div>
            <Link href={"/dashboard"} className="w-full pt-2">
            <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm tracking-wide gap-2 border-none active:scale-[0.98] transition-all shadow-md shadow-orange-600/10 rounded-2xl cursor-pointer">
                <ChefHat className="w-4 h-4 stroke-[2.5]" />
                Explore Recipes
            </Button>
            </Link>
        </div>
     )}
      </div>
    </div>
  )
}

export default SavedRecipePage;