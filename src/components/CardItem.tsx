import type { Item } from "@/db/schema";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatToDollar } from "@/utils/currency";

function CardItem({ item }: { item: Item }) {
  return (
    <div className="p-6 rounded-xl border space-y-2" key={item.id}>
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
      <Button asChild>
        <Link href={`/items/${item.id}`}>Place Bid</Link>
      </Button>
    </div>
  );
}

export default CardItem;
