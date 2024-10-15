"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { Bid, bids, items, User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Knock } from "@knocklabs/node";
import { env } from "@/env";
import { isBidOver } from "@/utils/bids";

const knock = new Knock(env.KNOCK_SECRET_KEY);

type BidWithUser = Bid & {
  user: User;
};

// to use this action we wrap the button inside a form
export async function placeBidAction(itemId: number) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("You must be logged in to place a bid");
  }

  // we need to fetch item data so we get all the previous bids on that item
  // so we can calculate the right amount of the new bid

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    throw new Error("Item no longer exist");
  }

  if (isBidOver(item)) {
    throw new Error("This auction is already over");
  }

  const owner = await database.query.users.findFirst({
    where: eq(users.id, item.userId),
  });

  let amount;
  if (item.currentBid === 0) {
    amount = item.startingPrice + item.bidInterval;
  } else {
    amount = item.currentBid + item.bidInterval;
  }

  await database.insert(bids).values({
    itemId,
    userId,
    amount,
    timestamp: new Date(),
  });

  // the currentBid is now the new bid amount
  await database
    .update(items)
    .set({ currentBid: amount })
    .where(eq(items.id, itemId));

  // get all the bids on the item
  const currentBids = (await database.query.bids.findMany({
    where: eq(bids.itemId, itemId),
    with: {
      user: true,
    },
  })) as BidWithUser[];

  const recipients: {
    id: string;
    name: string;
    email: string;
  }[] = [];

  for (const bid of currentBids) {
    if (
      bid.userId !== userId &&
      !recipients.find((recipient) => recipient.id === bid.userId)
    ) {
      recipients.push({
        id: bid.userId,
        name: bid.user.name ?? "Anonymous",
        email: bid.user.email,
      });
    }
  }

  //* notify the owner of the item
  recipients.push({
    id: owner?.id + "",
    name: owner?.name ?? "Anonymous",
    email: owner?.email ?? "",
  });

  if (recipients.length > 0) {
    await knock.workflows.trigger("user-placed-bid", {
      actor: {
        id: userId,
        name: session?.user?.name ?? "Anonymous",
        email: session?.user?.email,
        collection: "users",
      },
      recipients,
      data: {
        itemId,
        bidAmount: amount,
        itemName: item.name,
        userName: session?.user?.name ?? "Someone",
      },
    });
  }

  revalidatePath(`/items/${item.id}`);
}
