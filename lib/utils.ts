import { type ClassValue, clsx } from "clsx";
import { bgToText } from "lucide-react"; // unused, but we check tailwind-merge
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
