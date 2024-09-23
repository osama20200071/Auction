"use client";

import { formatToDollar } from "@/utils/currency";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

function Notification() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  return (
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
          <NotificationCell {...props} item={item} key={item.id}>
            <div className="rounded-xl">
              <Link
                className="text-blue-400 hover:text=blue-500 hover:underline"
                onClick={() => {
                  setIsVisible(false);
                }}
                href={`/items/${item?.data?.itemId}`}
              >
                Someone outbidded you on{" "}
                <span className="font-bold">{item?.data?.itemName}</span> by{" "}
                {formatToDollar(item?.data?.bidAmount)}
              </Link>
            </div>
          </NotificationCell>
        )}
      />
    </>
  );
}

export default Notification;
