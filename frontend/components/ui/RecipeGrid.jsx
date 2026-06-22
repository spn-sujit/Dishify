import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import useFetch from '../../hooks/use-fetch'
import RecipeCard from './RecipeCard'

const RecipeGrid = ({
    type,
    value,
    fetchAction,
    backLink="/dashboard"
}) => {
    const{data,loading,fn:fetchMeals} =useFetch(fetchAction);
    useEffect(()=>{
      if(value){
        const formattedValue=value.charAt(0).toUpperCase()+value.slice(1);
        fetchMeals(formattedValue);
      }
    },[value]);
    const meals=data?.meals || [];
    const displayName=value?.replace(/-/g," ");  
  return (
    <div className="min-h-screen bg-orange-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link 
            href={backLink} 
            className="inline-flex items-center gap-2 text-stone-600 hover:text-orange-600 font-medium transition-colors mb-6 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight leading-tight capitalize">
            {displayName}{"  "}
            <span className="text-orange-600">
               {type === "cuisine" ? "Cuisine" : "Recipes"}
            </span>
          </h1>
          {!loading && meals.length>0 && (
            <p className='text-stone-600 mt-2'>
              {meals.length} delicious {displayName} {" "}
              {type==='cuisine' ?'dishes':'recipes'} to try
            </p>
          )}
        </div>
       {loading && (
  <div className="fixed inset-x-0 top-0 pt-40 min-h-screen z-50 bg-orange-50 flex flex-col items-center justify-start p-4">
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="w-14 h-14 border-4 border-stone-200 border-t-orange-600 rounded-full animate-spin" />
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-1 capitalize">
          {type === 'cuisine' ? (
            value ? `Loading ${displayName} Cuisine...` : 'Loading Cuisine...'
          ) : (
            value ? `Loading ${displayName} Recipes...` : 'Loading Recipes...'
          )}
        </h2>
        <p className="text-stone-600 font-light text-sm max-w-xs">
          Fetching fresh flavors from around the world just for you.
        </p>
      </div>
    </div>
  </div>
)}
    {!loading && meals.length>0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
           {meals.map((meal)=>(
            <RecipeCard key={meal.idMeal} recipe={meal} variant='grid'/>
           ))}
        </div>
    )}
     {!loading && meals.length === 0 && (
  <div className="text-center py-20 bg-orange-50/50 rounded-2xl border border-stone-200/60 max-w-xl mx-auto px-4 shadow-xs">
    <div className="text-6xl mb-4 select-none animate-bounce duration-1000">🍽️</div>
    <h3 className="text-2xl font-bold text-stone-900 mb-2 tracking-tight">
      No recipes found
    </h3>
    <p className="text-stone-500 mb-6 font-light max-w-sm mx-auto text-sm leading-relaxed">
      We couldn&apos;t find any {displayName}{" "}
      {type === "cuisine" ? "dishes" : "recipes"}.
    </p>
    <Link href={backLink} className="inline-block group">
      <span className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors bg-white px-5 py-2.5 rounded-xl border border-orange-200 shadow-xs group-hover:shadow-sm transition-all duration-200">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        Go back to explore more
      </span>
    </Link>
  </div>
)}
      </div>
    </div>
  )
}

export default RecipeGrid