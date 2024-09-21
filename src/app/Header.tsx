import { auth } from "@/auth";
import SignIn from "@/components/Sign-in";
import { SignOut } from "@/components/Sign-out";
import Image from "next/image";
import logo from "./logo.png";
import React from "react";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  return (
    <div className="bg-gray-100 py-4 ">
      <div className="container flex justify-between  mx-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <Image src={logo} width="50" height="50" alt="Logo Image" />
            Auction.com
          </Link>

          <div>
            <Link
              href="/items/create"
              className="flex items-center gap-1 hover:underline"
            >
              Auction an item
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
