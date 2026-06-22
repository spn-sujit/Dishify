import { PricingTable } from "@clerk/nextjs";
import React from "react";

const PricingSection = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 bg-orange-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
          Simple Pricing
        </h2>
        <p className="mt-2 text-sm md:text-base text-stone-500">
          Start free and upgrade whenever you need more power.
        </p>
      </div>

      <div className="rounded-xl p-2 md:p-4">
        <PricingTable
          checkoutProps={{
            appearance: {
              elements: {
                drawerRoot: {
                  zIndex: 2000,
                },
              },
            },
          }}
          appearance={{
            variables: {
              colorBackground: "#fffaf5",
            },
            elements: {
              pricingTableCard: {
                borderTop: "2px solid #1c1917 !important",
                borderLeft: "2px solid #1c1917 !important",
                borderBottom: "6px solid #1c1917 !important",
                borderRight: "6px solid #1c1917 !important",
                borderRadius: "0.75rem",
                overflow: "hidden",
                backgroundColor: "#fffaf5",
              },
              pricingTableCardHeader: {
                backgroundColor: "#fffaf5",
                borderBottom: "none !important",
              },
              pricingTableCardContent: {
                backgroundColor: "#fffaf5",
              },
              pricingTableCardFooter: {
                backgroundColor: "#fffaf5",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PricingSection;