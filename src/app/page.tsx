import { getImageUrl } from "@/Appwrite/client";
import { auth } from "@/auth";
import CardItem from "@/components/CardItem";
import { database } from "@/db/database";
import Image from "next/image";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  allItems.forEach((item) => (item.fileKey = getImageUrl(item.fileKey)));

  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items For Sale</h1>
      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item) => (
          <CardItem item={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}
