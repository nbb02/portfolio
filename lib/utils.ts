import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodePath(path: string) {
  const parts = path.split("/")
  return decodeURIComponent(parts[parts.length - 1])
}
