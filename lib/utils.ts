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

export const formatDateDifference = (pastDateInput: Date | string): string | boolean => {
  const pastDate = new Date(pastDateInput);
  
  if (isNaN(pastDate.getTime())) {
    throw new Error("Invalid date");
  }
  
  const now = new Date();
  
  if (now>pastDate) {
    return false;
  }

  const difference =pastDate.getTime() - now.getTime();
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

export function checkRechargeDate(targetDate: Date): string | false {
  const now = new Date();
  const differenceInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

  // If the target date is in the past relative to the current time, return false
  if (differenceInSeconds < 0) {
      return false;
  }

  // Process future dates
  if (differenceInSeconds < 60) {
      return '>1m';  // Less than one minute remaining
  } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)}m`;  // Minutes remaining
  } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)}h`;  // Hours remaining
  } else {
      return `${Math.floor(differenceInSeconds / 86400)}d`;  // Days remaining
  }
}