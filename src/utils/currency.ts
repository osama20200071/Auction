import { formatDistance } from "date-fns";

export function formatToDollar(cents: number) {
  return ` $${Math.floor(cents / 100).toFixed(2)}`;
}

export function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}
