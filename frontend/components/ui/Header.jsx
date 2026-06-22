import React from "react";
import {  SignInButton, SignUpButton} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {  Cookie, Refrigerator, Sparkles } from "lucide-react";
import UserDropDown from "./UserDropDown";
import { checkUser } from "../../lib/checkUser";
import PricingModel from "./PricingModel";
import { Badge } from "./badge";
import HowToCookModal from "./HowToCookModal";

const Header = async () => {
  const user = await checkUser();
  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-[#fff7ed] backdrop-blur-md z-50 ">
      <nav className="w-full px-2 h-16 flex items-center justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Dishify"
            width={160}
            height={45}
            
            className="object-contain pt-2 h-auto "
          />
        </Link>
        <div className="hidden md:flex items-center gap-12">
          <Link
            href="/recipes"
            className="flex items-center gap-2 text-stone-600 hover:text-orange-500 transition-colors"
          >
            <Cookie className="w-5 h-5" />
            <span className="text-sm font-medium">My Recipes</span>
          </Link>

          <Link
            href="/pantry"
            className="flex items-center gap-2 text-stone-600 hover:text-orange-500 transition-colors"
          >
            <Refrigerator className="w-5 h-5" />
            <span className="text-sm font-medium">My Pantry</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {!user ? (<>
            <SignInButton mode="modal">
              <button className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium px-3 sm:px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-sm sm:text-base">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="rounded-full px-3 sm:px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-sm sm:text-base">
                Get Started
              </button>
            </SignUpButton>
          </>):(
  <div className="flex items-center gap-4">
    <HowToCookModal/>
    {user && (
      <PricingModel subscriptionTier={user.subscriptionTier}>
        <Badge
          variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm"
                      : "bg-stone-200/50 text-stone-600 border-stone-200 cursor-pointer hover:bg-stone-300/50 hover:border-stone-300"
                  }`}
        >
          <Sparkles
            className={`h-3.5 w-3.5 shrink-0 ${
              user.subscriptionTier === "pro"
                ? "text-white"
                : "text-stone-500"
            }`}
          />
          <span>
            {user.subscriptionTier === "pro"
              ? "Pro Chef"
              : "Free Plan"}
          </span>
        </Badge>
      </PricingModel>
    )}

    <UserDropDown />
  </div>
          )
             }
        </div>
      </nav>
    </header>
  );
};

export default Header;
