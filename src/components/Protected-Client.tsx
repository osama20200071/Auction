"use client";

import { useSession } from "next-auth/react";

type ProtectedProps = {
  children: React.ReactNode;
  condition?: boolean;
  fallback?: React.ReactNode;
};

function Protected({
  children,
  condition = true,
  fallback = null,
}: ProtectedProps) {
  const session = useSession();

  if (!session.data?.user.id || !condition) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default Protected;
