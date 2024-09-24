import { Bid } from "@/db/schema";
import { formatTimestamp } from "@/utils/bids";
import { formatToDollar } from "@/utils/currency";
import Link from "next/link";
import React from "react";

type UserBid = Bid & {
  user?: {
    name: string | null;
    image: string | null;
  };
};

type BidsProps = {
  bids: UserBid[];
};

function Bids({ bids }: BidsProps) {
  return (
    <ul className="space-y-4">
      {bids.map((bid) => (
        <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
          <div className="flex gap-2">
            <div>
              <span className="font-bold">{formatToDollar(bid.amount)}</span> by{" "}
              <Link href={`/users/${bid.userId}`}>
                <span className="font-bold hover:underline">
                  {bid?.user?.name}
                </span>
              </Link>
            </div>
            <div className="">{formatTimestamp(bid.timestamp)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Bids;
