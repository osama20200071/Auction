import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "./actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an item</h1>
      <form
        className="border p-6 rounded-xl max-w-lg space-y-4"
        action={createItemAction}
      >
        <Input required type="text" name="name" placeholder="Name your item" />
        <Input
          required
          type="number"
          step={0.01}
          name="startingPrice"
          placeholder="What to start your auction at"
        />
        <Button className="ml-auto flex" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
