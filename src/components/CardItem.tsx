import type { Item } from "@/db/schema";
import Image from "next/image";
import React from "react";

function CardItem({ item }: { item: Item }) {
  return (
    <div className="p-6 rounded-xl border space-y-2" key={item.id}>
      <Image
        alt="item image"
        className="max-h-64 w-auto"
        width={300}
        height={256}
        src={item.fileKey}
      />
      <h2 className="text-4xl font-bold"> {item.name}</h2>
      <div>Starting Price: ${item.startingPrice / 100}</div>
    </div>
  );
}

export default CardItem;
