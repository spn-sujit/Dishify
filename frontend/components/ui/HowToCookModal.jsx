"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChefHat, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './button'
import { toast } from 'sonner'

const HowToCookModal = () => {
    const router=useRouter();
    const [recipeName,setRecipeName]=useState("");
    const [isOpen,setIsOpen]=useState(false);
    const handleOpenChange=(open)=>{
        setIsOpen(open);
        if(!open){
            setRecipeName("");
        }
    }
    const handleSubmit=async(e) => {
        e.preventDefault();
        if(!recipeName.trim()){
            toast.error("Please enter a recipe name");
            return;
        }
        router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
        handleOpenChange(false);
    };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
  <DialogTrigger asChild >
    <button className="flex items-center gap-2 px-4 h-11 rounded-xl bg-transparent hover:text-orange-600 text-stone-700 font-bold text-sm transition-all active:scale-[0.98] cursor-pointer border-none shadow-none group">
        <ChefHat className="w-4 h-4 text-orange-600 stroke-[2.2] transition-transform group-hover:scale-110" />
        How to Cook?
    </button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md p-6 rounded-3xl border border-stone-100 shadow-xl bg-white">
    <DialogHeader className="space-y-1 text-left">
      <DialogTitle className="flex items-center gap-2 text-xl font-black text-stone-900 tracking-tight">
        <ChefHat className="w-5 h-5 text-orange-600 stroke-[2.2]" />
        How to Cook?
      </DialogTitle>
      <DialogDescription className="text-xs text-stone-500 font-medium leading-relaxed">
        Enter any recipe name and our AI chef will guide you through the cooking process
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-5 pt-2">
        <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 tracking-wide block">
                What would you like to cook?
            </label>
        <div className="relative flex items-center">
            <input type="text"
             onChange={(e)=>setRecipeName(e.target.value)}
             value={recipeName}
             placeholder='e.g., Chicken Biryani, Chocolate Cake, Pasta Carbonara'
             className="w-full h-11 pl-4 pr-10 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
            <Search className="absolute right-3.5 w-4 h-4 text-stone-400 stroke-[2.2] pointer-events-none"/>
        </div>
        </div>
        <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Try These:</h4>
            <div className="flex flex-wrap gap-1.5">
                {["Butter Chicken","Chocolate Brownies","Caesar Salad"].map((example)=>(
                   <button key={example} type='button' onClick={()=>setRecipeName(example)} className="px-3 py-1.5 bg-stone-100 hover:bg-orange-50 hover:text-orange-700 text-stone-600 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none">
                    {example}
                   </button>
                ))
                }
            </div>
        </div>
        <Button type="submit" disabled={!recipeName.trim()} className="w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm tracking-wide gap-2 border-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">
            <ChefHat className="w-4 h-4 stroke-[2.2]"/>
            Get Recipe
        </Button>
    </form>
  </DialogContent>
</Dialog>
  )
}

export default HowToCookModal