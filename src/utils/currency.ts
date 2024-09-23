import { Item } from "@/db/schema";
import { formatDistance } from "date-fns";

export function formatToDollar(cents: number) {
  return ` $${Math.floor(cents / 100).toFixed(2)}`;
}
