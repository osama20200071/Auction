import { auth } from "@/auth";
import { database } from "@/db/database";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();
  // console.log(bids);

  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Items For Sale</h1>
      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item) => (
          <div className="p-6 rounded-xl border" key={item.id}>
            {item.name}
            <div>Starting Price: ${item.startingPrice / 100}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
