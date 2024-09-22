import { database } from "@/db/database";
import { bids } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getBidsForItem(itemId: number) {
  return await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    orderBy: [desc(bids.timestamp)],
    // we make a join for the user info
    // so each bid have it's user info
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });
}
