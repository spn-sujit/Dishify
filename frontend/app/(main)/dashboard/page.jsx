import React from 'react'
import { getAreas, getCategories, getRecipeOfTheDay } from '../../../actions/mealdb.actions'
import { ArrowRight, Flame, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { getCategoryEmoji, getCountryFlag } from '../../../lib/data';

const DashboardPage = async() => {
  const recipeData= await getRecipeOfTheDay();
  const categoryData=await getCategories();
  const areasData=await getAreas();
  const recipeOfTheDay=recipeData?.recipe ;
  const categories=categoryData?.categories || [];
  const areas=areasData?.areas || [];
  return (
    <div className="min-h-screen bg-orange-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">
            Fresh Recipes, Served Daily 🔥
          </h1>
          <p className="text-xl text-stone-600 font-light max-w-2xl">
            Discover thousands of recipes from around the world. Cook, create, and savor.
          </p>
        </div>

        {recipeOfTheDay && (
          <section className="mb-24 relative">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
                Recipe of the Day
              </h2>
            </div>

            <Link href={`/recipe?cook=${encodeURIComponent(recipeOfTheDay.strMeal)}`} className="block group">
              <div className="relative w-full bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                
                <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
                  <Badge className="bg-orange-500 text-white hover:bg-orange-500 font-bold uppercase tracking-wide px-3 py-1 rounded-full border-none text-xs shadow-sm">
                    <Flame className="mr-1 w-3.5 h-3.5 fill-white" />
                    Today's Special
                  </Badge>
                </div>

                <div className="flex flex-col md:flex-row gap-8 p-6 items-center">
                  <div className="relative w-full md:w-80 h-64 md:h-64 shrink-0 rounded-2xl overflow-hidden bg-stone-100">
                    <Image
                      src={recipeOfTheDay.strMealThumb}
                      alt={recipeOfTheDay.strMeal}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 py-1 w-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge className="bg-orange-500 text-white hover:bg-orange-600 font-semibold px-3 py-1 rounded-full border-none text-xs shadow-xs">
                          {recipeOfTheDay.strCategory || "Recipe"}
                        </Badge>
                        <Badge className="bg-stone-100 text-stone-600 hover:bg-stone-100 font-medium px-3 py-1 rounded-full border border-stone-200 text-xs flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-stone-500" />
                          {recipeOfTheDay.strArea || "World"}
                        </Badge>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 tracking-tight leading-tight group-hover:text-orange-600 transition-colors">
                        {recipeOfTheDay.strMeal}
                      </h3>

                      <p className="text-stone-600 font-light text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                        {recipeOfTheDay.strInstructions?.substring(0, 200)}...
                      </p>

                      {recipeOfTheDay.strTags && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {recipeOfTheDay.strTags
                            .split(",")
                            .slice(0, 3)
                            .map((tag, i) => (
                              <Badge
                                key={i}
                                className="bg-stone-100 hover:bg-stone-100 text-stone-500 font-medium text-[11px] px-2.5 py-0.5 rounded-md border border-stone-200/60 lowercase"
                              >
                                #{tag.trim()}
                              </Badge>
                            ))}
                        </div>
                      )}
                    </div>

                    <Button className="w-fit flex items-center justify-center gap-2 rounded-full px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-sm border-none h-auto">
                      Start Cooking <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

              </div>
            </Link>
          </section>
        )}
        <section className="mb-24">
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2 tracking-tight">
      Browse by Category
    </h2>
    <p className="text-stone-600 text-base md:text-lg font-light">
      Find recipes that match your mood
    </p>
  </div>
  
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {categories.map((category) => (
      <Link 
        key={category.strCategory} 
        href={`/recipes/category/${category.strCategory.toLowerCase()}`}
        className="block group"
      >
        <div className="flex flex-col items-center justify-center p-6 bg-stone-50 border border-stone-200 rounded-2xl shadow-xs group-hover:shadow-md group-hover:border-orange-500 transition-all duration-300 text-center h-full cursor-pointer">
          <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">
            {getCategoryEmoji(category.strCategory)}
          </div>
          <h3 className="text-sm font-semibold text-stone-800 group-hover:text-orange-600 transition-colors tracking-tight">
            {category.strCategory}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</section>
<section className="mb-24">
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2 tracking-tight">
      Explore World Cuisines
    </h2>
    <p className="text-stone-600 text-base md:text-lg font-light">
      Travel the globe through food
    </p>
  </div>
  
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {areas.filter((area,index,self)=> index===self.findIndex((a)=>a.strArea===area.strArea)).map((area) => (
      <Link 
        key={area.strArea} 
        href={`/recipes/cuisine/${encodeURIComponent(area.strArea)}`}
        className="block group"
      >
        <div className="flex flex-col items-center justify-center p-6 bg-stone-50 border border-stone-200 rounded-2xl shadow-xs group-hover:shadow-md group-hover:border-orange-500 group-hover:bg-white transition-all duration-300 text-center h-full cursor-pointer">
          <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">
            {getCountryFlag(area.strArea)}
          </div>
          <h3 className="text-sm font-semibold text-stone-800 group-hover:text-orange-600 transition-colors tracking-tight">
            {area.strArea}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</section>
      </div>
    </div>
  )
}

export default DashboardPage