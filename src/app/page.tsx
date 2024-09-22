import { getImageUrl } from "@/Appwrite/client";
import { auth } from "@/auth";
import CardItem from "@/components/CardItem";
import { EmptyState } from "@/components/EmptyState";
import { database } from "@/db/database";
import { pageTitleStyles } from "../styles";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  allItems.forEach((item) => (item.fileKey = getImageUrl(item.fileKey)));

  const session = await auth();
  const user = session?.user;

  if (!user) return null;

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
        <EmptyState text="We have no auctions yet" />
      )}
    </main>
  );
}
