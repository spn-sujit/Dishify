"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import PricingSection from './PricingSection';
const PricingModel = ({subscriptionTier="free",children}) => {
    const [isOpen,setIsOpen]=useState(false);
    const canOpen=subscriptionTier==="free";
  return (
    <Dialog open={isOpen} onOpenChange={canOpen ?setIsOpen:undefined} >
  <DialogTrigger className="inline-block bg-transparent border-0 p-0 cursor-pointer text-left">
  {children}
</DialogTrigger>
<DialogContent className="sm:max-w-5xl p-0 overflow-hidden rounded-[32px] bg-orange-50 [&>button]:text-orange-600 [&>button]:shadow-none [&>button]:border-0 [&>button]:bg-transparent">
  <DialogTitle className="sr-only">Upgrade Plans</DialogTitle>
  <DialogDescription className="sr-only">
    Choose a subscription plan to upgrade your kitchen capabilities.
  </DialogDescription>
   
  <PricingSection />
</DialogContent>
</Dialog>
  )
}

export default PricingModel

