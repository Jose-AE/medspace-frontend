import { env } from "@/config/env";

export function logError(message: string, data?: unknown): void {
  if (!env.NEXT_PUBLIC_DEBUG_MODE) return;

  if (data) {
    console.error(`[DEBUG]: ${message}`, data);
  } else {
    console.error(`[DEBUG]: ${message}`);
  }
}

export function logInfo(message: string, data?: unknown): void {
  if (!env.NEXT_PUBLIC_DEBUG_MODE) return;

  if (data) {
    console.log(`[DEBUG]: ${message}`, data);
  } else {
    console.log(`[DEBUG]: ${message}`);
  }
}

export function logWarning(message: string, data?: unknown): void {
  if (!env.NEXT_PUBLIC_DEBUG_MODE) return;

  if (data) {
    console.warn(`[DEBUG]: ${message}`, data);
  } else {
    console.warn(`[DEBUG]: ${message}`);
  }
}
