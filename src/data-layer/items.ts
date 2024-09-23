import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getItem(itemId: number) {
  return await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });
}

export async function getAllItems() {
  return database.query.items.findMany();
}

export async function getUserItems(userId: string) {
  return await database.query.items.findMany({
    where: eq(items.userId, userId!),
  });
}
