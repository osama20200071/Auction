import { database } from "@/db/database";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: string) {
  return await database.query.users.findFirst({
    where: eq(users.id, userId),
  });
}
