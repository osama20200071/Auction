import { getImageUrl } from "@/Appwrite/client";
import { Button } from "@/components/ui/button";

import { formatTimestamp, formatToDollar } from "@/utils/currency";
import { pageTitleStyles } from "@/styles";

import Image from "next/image";
import Link from "next/link";
import { placeBidAction } from "./actions";
import { getBidsForItem } from "@/data-layer/bids";
import { getItem } from "@/data-layer/items";
import { auth } from "@/auth";

async function ItemPage({ params: { id } }: { params: { id: string } }) {
  // this parseInt get the number from the string so 22r => 22
  // but we may not have that 22R already

  const item = await getItem(parseInt(id));
  const session = await auth();

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center mt-7">
        <Image src="/empty.svg" width="400" height="400" alt="Package" />
        <h1 className={pageTitleStyles}>Item not found</h1>
        <p>
          The item you&apos;re trying to review is invalid, Please go back and
          search for different auction item.
        </p>
        <Button asChild>
          <Link href="/">View Auctions</Link>
        </Button>
      </div>
    );
  }

  item.fileKey = getImageUrl(item.fileKey);
  const AllBids = await getBidsForItem(item.id);
  const hasBids = AllBids.length > 0;

  const canPlaceBid = session && item.userId !== session.user.id;

  return (
    <div className="flex gap-8">
      <div className="space-y-8 ">
        <h1 className={pageTitleStyles}>
          <span className="font-normal">Auction For</span> {item.name}
        </h1>
        <Image
          alt={item.name}
          className="rounded-xl"
          width={400}
          height={400}
          src={item.fileKey}
        />
        <div className="text-xl">
          Current Price
          <span className="font-bold">
            {formatToDollar(hasBids ? item.currentBid : item.startingPrice)}
          </span>
        </div>
        <div className="text-xl">
          Starting Price
          <span className="font-bold">
            {formatToDollar(item.startingPrice)}
          </span>
        </div>
        <div className="text-xl">
          Bid Interval
          <span className="font-bold">{formatToDollar(item.bidInterval)}</span>
        </div>
      </div>

      <div className="space-y-8 flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Current bids: </h2>

          {hasBids && canPlaceBid && (
            <form action={placeBidAction.bind(null, item.id)}>
              <Button>Place bid</Button>
            </form>
          )}
        </div>

        {hasBids ? (
          <ul className="space-y-4">
            {AllBids.map((bid) => (
              <li key={bid.id} className="bg-gray-100 rounded-xl p-8">
                <div className="flex gap-4">
                  <div>
                    <span className="font-bold">
                      {formatToDollar(bid.amount)}
                    </span>{" "}
                    by <span className="font-bold">{bid.user.name}</span>
                  </div>
                  <div className="">{formatTimestamp(bid.timestamp)}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-8 bg-gray-100 rounded-xl p-12">
            <Image src="/empty.svg" width="400" height="400" alt="Package" />
            <h2 className="text-2xl font-bold">No bids yet</h2>
            {canPlaceBid && (
              <form action={placeBidAction.bind(null, item.id)}>
                <Button>Place the first bid</Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemPage;
