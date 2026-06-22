import { Badge } from "../components/ui/badge";
import { ArrowRight, Clock, Flame, Star, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Image from "next/image";
import { FEATURES, HOW_IT_WORKS_STEPS, SITE_STATS } from "../lib/data";
import PricingSection from "../components/ui/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fff7ed] text-orange-950">
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 text-center md:text-left">
              <Badge
                variant="outline"
                className={
                  "border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide rounded-full px-4 py-1.5"
                }
              >
                <Flame className="mr-1" />
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
                Turn your{" "}
                <span className="text-orange-500 italic">leftovers</span> into{" "}
                <br />
                masterpieces.
              </h1>

              <p className="text-xl text-orange-900/60 leading-relaxed mt-4">
                Snap a photo of your fridge. We&apos;ll tell you what to cook.
                Save money, reduce waste, and eat better tonight.
              </p>

              <Link href={"/dashboard"}>
                <Button
                  size="s"
                  className={
                    " mt-4 px-5 py-4 text-lg bg-orange-600 text-white hover:bg-orange-700"
                  }
                >
                  Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900 mr-1">10k+cooks</span>
                {"      "}
                joined last month
              </p>
            </div>
            <Card
              className={
                "relative w-full lg:w-162.5 h-87.5 md:h-112.5 lg:h-112.5 border-4 border-stone-900 bg-stone-200 overflow-hidden py-0 flex-shrink-0 lg:-translate-x-8"
              }
            >
              <Image
                className="w-full h-full object-cover"
                src="/pasta-dish.png"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 650px"
                alt="food"
              />
              <Card
                className={
                  " absolute  bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm border-2 border-stone-900 py-0"
                }
              >
                <CardContent className={"p-4 px-6"}>
                  <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex flex-wrap items-center gap-4">
                      <h3 className="font-bold text-xl text-stone-900 tracking-tight">
                        Rustic Tomato Basil Pasta
                      </h3>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-orange-500 text-orange-500"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 justify-between lg:justify-end">
                      <div className="flex items-center gap-5 text-sm font-semibold text-stone-700">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-stone-500 stroke-[2.5]" />{" "}
                          25 mins
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-stone-500 stroke-[2.5]" />{" "}
                          2 servings
                        </span>
                      </div>

                      <Badge
                        variant="outline"
                        className="border-2 border-green-700 bg-green-50 text-green-700 font-bold px-3 py-1 text-xs rounded-md tracking-wide flex-shrink-0"
                      >
                        98% Match
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-12 border-y-2 border-stone-900 bg-stone-900">
  <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
    {SITE_STATS.map((stats, i) => (
      <div key={i}>
        <div className="text-4xl font-bold mb-1 text-orange-50">
          {stats.val}
        </div>
        <div className="text-sm uppercase tracking-wider text-orange-100 font-semibold">
          {stats.label}
        </div>
      </div>
    ))}
  </div>
</section>
<section className="py-24 px-4">
  <div className="max-w-7xl mx-auto">
    
    <div className="text-center max-w-2xl mx-auto mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-4">Your Smart Kitchen</h2>
      <p className="text-lg text-stone-600">Every you need to master your meal prep.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch">
      {FEATURES.map((feature,i)=>{
        const IconComponent=feature.icon;
        return(
          <Card
           key={i}
           className={'border-2 border-stone-900 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] bg-[#fffaf5] transition-transform hover:-translate-y-1 flex flex-col h-full'}
          >
            <CardContent className="p-8 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-2.5 bg-orange-50 border-2 border-orange-600 rounded-xl text-orange-600">
                    <IconComponent className="w-6 h-6"/>
                  </div>
                  <Badge variant="outline" className="border-2 border-stone-900 bg-amber-100 text-stone-900 font-bold px-2.5 py-0.5 rounded-md text-xs">
                    {feature.limit}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-3">{feature.title}</h3>
              </div>
              <p className="text-stone-600 text-base leading-relaxed mt-auto">{feature.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  </div>
</section>
<section className="py-24 bg-stone-900 border-y-2 border-stone-950 px-4 text-orange-50">
  <div className="max-w-4xl mx-auto">
    
    <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-16 text-orange-50">
      Cook in 3 Steps
    </h2>
    
    <div className="space-y-8">
      {HOW_IT_WORKS_STEPS.map((item, i) => (
        <div key={i} className="w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            
            <Badge className="w-12 h-12 rounded-xl bg-orange-500 hover:bg-orange-500 text-stone-950 text-xl font-black flex items-center justify-center border-2 border-stone-950 shadow-[3px_3px_0px_0px_rgba(255,247,237,1)] flex-shrink-0">
              {item.step}
            </Badge>
            
            <div className="flex-1 space-y-1">
              <h3 className="text-2xl font-bold text-orange-50 tracking-tight">
                {item.title}
              </h3>
              <p className="text-stone-400 text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
          {i < HOW_IT_WORKS_STEPS.length - 1 && (
            <hr className="my-8 border-t-2 border-stone-800" />
          )}
        </div>
      ))}
    </div>
  </div>
</section>
   <section className="pt-6 bg-[#fff7ed] text-orange-950 px-4 border-t-2 border-stone-900">
  <div className="max-w-6xl mx-auto">
    <PricingSection />
  </div>
</section>
    </div>
  );
}
