import { getImageUrl } from "@/Appwrite/client";
import { auth } from "@/auth";
import CardItem from "@/components/CardItem";
import { EmptyState } from "../../components/EmptyState";
import { Button } from "@/components/ui/button";
import { getUserItems } from "@/data-layer/items";
import Link from "next/link";
import SignIn from "@/components/Sign-in-Client";

async function MyAuctionsPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <EmptyState text="You need to login first">
        <SignIn />
      </EmptyState>
    );
  }

  const userItems = await getUserItems(user.id);
  userItems.forEach((item) => (item.fileKey = getImageUrl(item.fileKey)));
  const hasItems = userItems.length > 0;

  return (
    <div className=" space-y-8">
      <h1 className="text-4xl font-bold">Your Current Auctions</h1>
      {hasItems ? (
        <div className="grid grid-cols-4 gap-4">
          {userItems.map((item) => (
            <CardItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <EmptyState text="You have no auctions yet">
          <Button asChild>
            <Link href="/items/create">Create Auction</Link>
          </Button>
        </EmptyState>
      )}
    </div>
  );
}

export default MyAuctionsPage;
