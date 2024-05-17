import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getDayName = (date: Date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Function to format the date
export const formatDate = (date: Date) => {
  const d = new Date(date);
  const dayName = getDayName(d);
  const day = d.getDate();
  const year = d.getFullYear();

  return `${dayName} ${day}, ${year}`;
};