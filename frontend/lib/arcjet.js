import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";


const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield WAF - protects against SQL injection, XSS, etc.
    shield({
      mode: "LIVE", // Change to "DRY_RUN" to test without blocking
    }),

    // Bot detection - allow search engines, block malicious bots
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
        "CATEGORY:PREVIEW", // Link previews (Slack, Discord, etc.)
      ],
    }),
  ],
});

export const freePantryScans=aj.withRule(
    tokenBucket({
        mode:"LIVE",
        characteristics:["userId"],
        refillRate:10,
        interval:"30d",
        capacity:10,
    })
);

export const freeMealRecommendations=aj.withRule(
    tokenBucket({
        mode:"LIVE",
        characteristics:["userId"],
        refillRate:5,
        interval:"30d",
        capacity:5,
    })
);

export const proTierLimit=aj.withRule(
    tokenBucket({
        mode:"LIVE",
        characteristics:["userId"],
        refillRate:1000,
        interval:"1d",
        capacity:1000,
    })
);
