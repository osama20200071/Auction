import { database } from "@/db/database";
import { Bid, bids } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

type UserBid = Bid & {
  user: {
    name: string | null;
    image: string | null;
  };
};

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

export async function getBidsForUser(userId: string) {
  return await database.query.bids.findMany({
    where: eq(bids.userId, userId),
    orderBy: [desc(bids.timestamp)],
    with: {
      item: {
        columns: {
          name: true,
        },
      },
    },
  });
}
