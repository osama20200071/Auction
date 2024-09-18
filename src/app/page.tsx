import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import { SignOut } from "@/components/Sign-out";
import { Button } from "@/components/ui/button";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();
  // console.log(bids);

  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}

      <form
        action={async (formData) => {
          "use server";
          const name = formData.get("name");
          await database.insert(items).values({
            name: name as string,
            userId: user.id as string,
          });

          revalidatePath("/");
        }}
      >
        <input type="text" name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
        {/* <button type="submit">Place a Bid</button> */}
      </form>
      <div>
        {allItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}
