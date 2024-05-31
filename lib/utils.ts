import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (date: Date) => {
  const d = new Date(date);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const formatTime = (date: Date) => {

  const d = new Date(date);
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

export function timeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // getTime() returns the time in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
}

export const getTimeLeft = (futureDate: Date) => {
  const now = new Date();
  const endDate = new Date(futureDate);
  const difference = endDate.getTime() - now.getTime(); // Difference in milliseconds

  if (difference <= 0) {
    return "Time is up";
  }

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  } else {
    return `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} left`;
  }
};