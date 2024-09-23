"use client";

import { Button } from "@/components/ui/button";
import { formatToDollar } from "@/utils/currency";

import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const userId = session?.data?.user?.id;
  console.log(userId);

  return (
    <div className="bg-gray-100 py-2">
      <div className="container flex justify-between items-center mx-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Auctions
            </Link>

            {userId && (
              <>
                <Link
                  href="/auctions"
                  className="hover:underline flex items-center gap-1"
                >
                  My Auctions
                </Link>
                <Link
                  href="/items/create"
                  className="hover:underline flex items-center gap-1"
                >
                  Create Auction
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <div className="rounded-xl">
                      <Link
                        className="text-blue-400 hover:text=blue-500 hover:underline"
                        onClick={() => {
                          setIsVisible(false);
                        }}
                        href={`/items/${item?.data?.itemId}`}
                      >
                        Someone outbidded you on{" "}
                        <span className="font-bold">
                          {item?.data?.itemName}
                        </span>{" "}
                        by {formatToDollar(item?.data?.bidAmount)}
                      </Link>
                    </div>
                  </NotificationCell>
                )}
              />
            </>
          )}

          {session?.data?.user?.image && (
            <Image
              src={session.data.user.image}
              width="40"
              height="40"
              alt="user avatar"
              className="rounded-full"
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button type="submit" onClick={() => signIn()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
