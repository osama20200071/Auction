export const dynamic = "force-dynamic"; // Force dynamic rendering
import { getImageUrl } from "@/Appwrite/client";
import CardItem from "@/components/CardItem";
import { EmptyState } from "@/components/EmptyState";
import { pageTitleStyles } from "../styles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignIn from "@/components/Sign-in-Client";
import Protected from "@/components/Protected-Server";
import { getAllItems } from "@/data-layer/items";

export default async function HomePage() {
  const allItems = await getAllItems();
  allItems.forEach((item) => (item.fileKey = getImageUrl(item.fileKey)));

  const haveAuctions = allItems.length > 0;

  return (
    <main className=" space-y-8">
      <h1 className={pageTitleStyles}>Items For Sale</h1>

      {haveAuctions ? (
        <div className="grid grid-cols-4 gap-4">
          {allItems.map((item) => (
            <CardItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <EmptyState text="We have no auctions yet">
          <Protected fallback={<SignIn />}>
            <Button asChild>
              <Link href="/items/create">Create Auction</Link>
            </Button>
          </Protected>
        </EmptyState>
      )}
    </main>
  );
}
