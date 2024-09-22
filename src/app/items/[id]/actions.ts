"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// to use this action we wrap the button inside a form
export async function placeBidAction(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Login first to place a bid");
  }
  // we need to fetch item data so we get all the previous bids on that item
  // so we can calculate the right amount of the new bid

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    throw new Error("Item no longer exist");
  }

  let amount;
  if (item.currentBid === 0) {
    amount = item.startingPrice + item.bidInterval;
  } else {
    amount = item.currentBid + item.bidInterval;
  }

  const bid = await database.insert(bids).values({
    itemId,
    userId: session.user.id as string,
    amount,
    timestamp: new Date(),
  });

  // the currentBid is now the new bid amount
  await database
    .update(items)
    .set({ currentBid: amount })
    .where(eq(items.id, itemId));

  revalidatePath(`/items/${items.id}`);
}
