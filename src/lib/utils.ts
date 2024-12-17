import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import clientPromise from './mongodb';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

