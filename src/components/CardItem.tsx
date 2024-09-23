import type { Item } from "@/db/schema";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollar } from "@/utils/currency";
import { format } from "date-fns";
import { isBidOver } from "@/utils/bids";
import { Badge } from "./ui/badge";

function CardItem({ item }: { item: Item }) {
  return (
    <div className="p-6 rounded-xl border space-y-2 relative" key={item.id}>
      <Image
        alt={item.name}
        className="rounded-xl"
        width={300}
        height={300}
        src={item.fileKey}
      />
      <h2 className="text-4xl font-bold"> {item.name}</h2>
      <div>
        Starting Price:{" "}
        <span className="font-bold">{formatToDollar(item.startingPrice)}</span>
      </div>
      {isBidOver(item) ? (
        <>
          {/* <div className="font-bold">Bidding is over</div> */}
          <Badge
            className="w-fit text-sm mr-2 absolute top-0 right-0 "
            variant="destructive"
          >
            Bidding Over
          </Badge>
          {/* <div>
            Sold For:{" "}
            <span className="font-bold">{formatToDollar(item.currentBid)}</span>
          </div> */}
          <Button asChild variant="secondary">
            <Link href={`/items/${item.id}`}>View Bids</Link>
          </Button>
        </>
      ) : (
        <>
          <div>
            Ends On:{" "}
            <span className="font-bold">
              {format(item.endDate, "eeee M/dd/yy")}
            </span>
          </div>
          <Button asChild>
            <Link href={`/items/${item.id}`}>Place Bid</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default CardItem;
