import { auth } from "@/auth";

type ProtectedProps = {
  children: React.ReactNode;
  condition?: boolean;
  fallback: React.ReactNode;
};

async function Protected({
  children,
  condition = true,
  fallback = null,
}: ProtectedProps) {
  const session = await auth();

  if (!session?.user.id || !condition) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default Protected;
