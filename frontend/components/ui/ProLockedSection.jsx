"use client";
import React from 'react';
import PricingModel from './PricingModel';

const ProLockedSection = ({
    isPro,
    lockText,
    ctaText="Upgrade to Pro",
    children
}) => {
  return (
    <div className="relative w-full isolate rounded-2xl overflow-hidden">
      <div 
        className="w-full transition-all duration-300"
        style={!isPro ? { filter: 'blur(4px)', WebkitFilter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' } : {}}
      >
        {children}
      </div>
      
      {!isPro && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
          <PricingModel>
            <div className="flex flex-col items-center justify-center gap-1.5 p-3 bg-white hover:bg-stone-50 border border-stone-200 shadow-md rounded-2xl transition-all duration-200 group active:scale-95 cursor-pointer max-w-[220px] w-full">
              <div className="flex items-center gap-1.5 text-stone-900 font-black tracking-tight text-xs uppercase">
                <span>🔒</span>
                <span className="truncate max-w-37.5">{lockText}</span>
              </div>
              <div className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md group-hover:bg-orange-100/70 transition-colors uppercase tracking-wider">
                {ctaText}
              </div>
            </div>
          </PricingModel>
        </div>
      )}
    </div>
  )
}

export default ProLockedSection;