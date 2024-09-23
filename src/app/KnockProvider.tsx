"use client";

import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";
import { env } from "@/env";
import { useSession } from "next-auth/react";

export function KnockAppProvider({ children }: { children: React.ReactNode }) {
  const session = useSession();

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.data?.user?.id ?? ""}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
