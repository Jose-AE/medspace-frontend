export const env = {
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",

  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  NEXT_PUBLIC_DEBUG_MODE:
    process.env.NEXT_PUBLIC_DEBUG_MODE === "true" ? true : false
};

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`${key} not found in ENV`);
  }
}
