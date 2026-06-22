import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./badge";
import { ChefHat, Clock, Users, Users2 } from "lucide-react";
import { Button } from "./button";
const RecipeCard = ({ recipe, variant = "default" }) => {
  const getRecipeData = () => {
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      };
    }
    if (recipe.matchPercentage) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        serving: recipe.servings,
        matchPercentage: recipe.matchPercentage,
        missingIngredients: recipe.missingIngredients || [],
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      };
    }
    if(recipe){
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      }
    }
  };
  const data = getRecipeData();
  if (variant === "grid") {
    return (
      <Link href={data.href} className="block h-full">
        <Card className="rounded-2xl overflow-hidden border border-stone-200/60 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group pt-0 h-full flex flex-col justify-between">
          <div>
            {data.showImage ? (
              <div className="relative aspect-square overflow-hidden bg-stone-100 w-full">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width:760px) 100vw, (max-width:1200px) 50vw , 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-orange-400 text-sm font-semibold tracking-wide uppercase">
                      Click to view recipe
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <CardHeader className="p-5">
              <CardTitle className="text-xl font-bold text-stone-900 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2 capitalize">
                {data.title}
              </CardTitle>
            </CardHeader>
          </div>
        </Card>
      </Link>
    );
  }
  if (variant === "pantry") {
    return (
      <Card className="rounded-2xl border border-stone-200 bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group p-6 space-y-5">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {data.cuisine && (
                <Badge className="bg-stone-50 text-stone-700 hover:bg-stone-50 border border-stone-200/60 rounded-md text-[10px] font-bold tracking-wider uppercase px-2 py-0.5">
                  {data.cuisine}
                </Badge>
              )}
              {data.category && (
                <Badge className="bg-stone-50 text-stone-700 hover:bg-stone-50 border border-stone-200/60 rounded-md text-[10px] font-bold tracking-wider uppercase px-2 py-0.5">
                  {data.category}
                </Badge>
              )}
            </div>
            {data.matchPercentage && (
              <div className="inline-flex items-center gap-1.5">
                <Badge className={`hover:bg-transparent border rounded-md text-xs font-bold px-2 py-0.5 shadow-3xs ${
                  data.matchPercentage >= 90 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  data.matchPercentage >= 75 ? "bg-orange-50 text-orange-700 border-orange-200" :
                  "bg-rose-50 text-rose-700 border-rose-200"
                }`}>
                  {data.matchPercentage}%
                </Badge>
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider">Match</span>
              </div>
            )}
          </div>

          <CardTitle className="text-xl font-extrabold text-stone-900 capitalize tracking-tight pt-1 group-hover:text-orange-600 transition-colors duration-200">
            {data.title}
          </CardTitle>

          {data.description && (
            <CardDescription className="text-stone-500 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2">
              {data.description}
            </CardDescription>
          )}

          <div className="flex items-center gap-4 text-xs font-bold text-stone-500 pt-1">
            {(data.prepTime || data.cookTime || data.serving) && (
              <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-stone-400 stroke-[2.5]" />
                <span>
                  {parseInt(data.prepTime || 0) + parseInt(data.cookTime || 0)} mins
                </span>
              </div>
            )}
            {data.serving && (
              <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-lg">
                <Users2 className="w-3.5 h-3.5 text-stone-400 stroke-[2.5]" />
                <span>{data.serving} servings</span>
              </div>
            )}
          </div>

          {data.missingIngredients && data.missingIngredients.length > 0 && (
            <div className="space-y-2 border-t border-stone-100 pt-4">
              <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">You&apos;ll need:</h4>
              <div className="flex flex-wrap gap-1.5">
                {data.missingIngredients.map((ingredient, i) => (
                  <Badge key={i} className="bg-orange-50 text-orange-700 hover:bg-orange-50 border border-orange-200 rounded-md text-xs font-semibold px-2.5 py-0.5">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-full pt-2">
          <Link href={data.href} className="w-full block">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 px-4 rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/15 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm tracking-wide border border-transparent">
              <ChefHat className="w-4 h-4 stroke-[2.5]" />
              View Full Recipe
            </Button>
          </Link>
        </div>
      </Card>
    );
  }
if (variant === "list") {
  return (
    <Link href={data.href} className="group block w-full">
      <Card className="rounded-2xl border border-stone-200/80 hover:border-orange-200/60 hover:shadow-sm transition-all duration-300 cursor-pointer overflow-hidden bg-white shadow-none w-full">
        <div className="grid grid-cols-12 items-center gap-4 p-4">
          
          <div className="col-span-4 sm:col-span-3 lg:col-span-2">
            {data.showImage ? (
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-stone-100">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 30vw, 150px"
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-orange-50 flex items-center justify-center text-orange-600 rounded-xl">
                <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
            )}
          </div>

          <div className="col-span-8 sm:col-span-9 lg:col-span-10 flex flex-col justify-center min-w-0 h-full py-1">
            <CardHeader className="p-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {data.cuisine && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold px-2.5 h-5 bg-orange-50/50 text-orange-600 border-orange-200/60 rounded-md capitalize tracking-wide shadow-none flex items-center shrink-0"
                  >
                    {data.cuisine}
                  </Badge>
                )}
                {data.category && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold px-2.5 h-5 bg-stone-50 text-stone-600 border-stone-200 rounded-md capitalize tracking-wide shadow-none flex items-center shrink-0"
                  >
                    {data.category}
                  </Badge>
                )}
                
                {(data.prepTime || data.cookTime || data.servings) && (
                  <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold text-stone-400 pl-1 shrink-0">
                    {(data.prepTime || data.cookTime) && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 stroke-[2.2] text-stone-400" />
                        {parseInt(data.prepTime || 0) + parseInt(data.cookTime || 0)}m
                      </span>
                    )}
                    {data.servings && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 stroke-[2.2] text-stone-400" />
                        {data.servings} serving{parseInt(data.servings) !== 1 && 's'}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <CardTitle className="text-base sm:text-lg font-black text-stone-900 tracking-tight group-hover:text-orange-600 transition-colors duration-150 line-clamp-1">
                {data.title}
              </CardTitle>
              
              {data.description && (
                <CardDescription className="text-xs font-medium text-stone-500 leading-relaxed line-clamp-1 sm:line-clamp-2 pt-0.5">
                  {data.description}
                </CardDescription>
              )}
            </CardHeader>

            {(data.prepTime || data.cookTime || data.servings) && (
              <CardContent className="p-0 flex sm:hidden items-center gap-3 text-[11px] font-bold text-stone-400 pt-2 mt-1">
                {(data.prepTime || data.cookTime) && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>
                      {parseInt(data.prepTime || 0) + parseInt(data.cookTime || 0)}m
                    </span>
                  </div>
                )}
                {data.servings && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 stroke-[2.2]" />
                    <span>{data.servings} serving{parseInt(data.servings) !== 1 && 's'}</span>
                  </div>
                )}
              </CardContent>
            )}
          </div>

        </div>
      </Card>
    </Link>
  )
}
};

export default RecipeCard;
