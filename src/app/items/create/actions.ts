"use server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";

import { redirect } from "next/navigation";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const price = formData.get("startingPrice") as string;
  const cents = Math.floor(parseFloat(price) * 100);

  const name = formData.get("name");
  await database.insert(items).values({
    name: name as string,
    startingPrice: cents,
    userId: user.id,
  });

  // revalidatePath("/"); we don't need to revalidate the home page
  redirect("/");
}
