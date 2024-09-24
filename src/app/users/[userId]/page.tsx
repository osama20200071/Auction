import { auth } from "@/auth";
import { EmptyState } from "@/components/EmptyState";
import SignIn from "@/components/Sign-in-Client";
import { getBidsForUser } from "@/data-layer/bids";
import { getUser } from "@/data-layer/users";
import { Bid } from "@/db/schema";
import { formatToDollar } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type BidWithItem = Bid & { item: { name: string } };

async function UserPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  // show user info
  // show user items
  // show user bids

  const session = await auth();

  if (!session?.user) {
    return (
      <EmptyState text="You need to login first">
        {/* <SignIn /> */}
        <SignIn />
      </EmptyState>
    );
  }

  const user = await getUser(userId);
  const bids = (await getBidsForUser(userId)) as BidWithItem[];

  return (
    <div className="space-y-4">
      {user?.image && (
        <Image
          src={user.image}
          width={150}
          height={150}
          alt="user image"
          className="rounded-xl"
        />
      )}
      <h2 className="text-2xl font-bold">{user?.name}</h2>
      <p>{user?.email}</p>
      {bids.length > 0 && (
        <ul>
          {bids.map((bid) => (
            <li key={bid.id} className="text-xl font-semibold space-x-2">
              <span>{formatToDollar(bid.amount)}</span>
              <Link href={`/items/${bid.itemId}`}>
                <span className="hover:underline">{bid.item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserPage;
