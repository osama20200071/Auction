import Image from "next/image";
import { ReactNode } from "react";

export function EmptyState({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      <Image src="/empty.svg" width="400" height="400" alt="Package" />
      <h2 className="text-2xl font-bold">{text}</h2>
      {children}
    </div>
  );
}
