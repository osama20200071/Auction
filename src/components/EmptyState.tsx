import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      <Image src="/empty.svg" width="400" height="400" alt="Package" />
      <h2 className="text-2xl font-bold">{text}</h2>
      <Button asChild>
        <Link href="/items/create">Create Auction</Link>
      </Button>
    </div>
  );
}
