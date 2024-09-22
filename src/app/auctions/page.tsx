import { getImageUrl } from "@/Appwrite/client";
import { auth } from "@/auth";
import CardItem from "@/components/CardItem";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EmptyState } from "../../components/EmptyState";

async function MyAuctionsPage() {
  const session = await auth();
  const user = session?.user;
  if (!user) return null;

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, user.id!),
  });

  allItems.forEach((item) => (item.fileKey = getImageUrl(item.fileKey)));

  const hasItems = allItems.length > 0;
  return (
    <div className=" space-y-8">
      <h1 className="text-4xl font-bold">Your Current Auctions</h1>
      {hasItems ? (
        <div className="grid grid-cols-4 gap-4">
          {allItems.map((item) => (
            <CardItem item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <EmptyState text="You have no auctions yet" />
      )}
    </div>
  );
}

export default MyAuctionsPage;
