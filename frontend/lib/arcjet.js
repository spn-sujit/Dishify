import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";


export const aj=arcjet({
    key:process.env.ARCJET_KEY,
    rules:[
        shield({
            mode:"LIVE",
        }),
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
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
