import { Item } from "@/db/schema";
import { formatDistance } from "date-fns";

export function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export function isBidOver(item: Item) {
  return item.endDate < new Date();
}
