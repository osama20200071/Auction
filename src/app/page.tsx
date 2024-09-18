import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { Bids as bidsSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  // const bids = await database.select().from(Bids);
  const bids = await database.query.Bids.findMany();
  console.log(bids);

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData) => {
          "use server";
          const bid = formData.get("bid");
          await database.insert(bidsSchema).values({});
          revalidatePath("/");
        }}
      >
        <input type="text" name="bid" />
        <Button type="submit">Place a Bid</Button>
        {/* <button type="submit">Place a Bid</button> */}
      </form>
      <div>
        {bids.map((bid) => (
          <div key={bid.id}>{bid.id}</div>
        ))}
      </div>
    </main>
  );
}
