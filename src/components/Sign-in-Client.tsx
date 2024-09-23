"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return <Button onClick={() => signIn()}>Sign in with Google</Button>;
};

export default SignIn;
