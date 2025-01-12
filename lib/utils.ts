import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodePath(path: string) {
  const parts = path.split("/")
  return decodeURIComponent(parts[parts.length - 1])
}

export function validatedFile(file: File) {
  const MAX_FILE_SIZE = 10 * 1024 * 1024

  const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-matroska",
  ]

  if (!ALLOWED_TYPES.includes(file.type)) {
    console.log("invalid")
    return {
      valid: false,
      error: "Error: Only image and video files are allowed",
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    console.log("invalid")
    return {
      valid: false,
      error: `Error: File size must be less than ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB.`,
    }
  }

  return {
    valid: true,
  }
}
