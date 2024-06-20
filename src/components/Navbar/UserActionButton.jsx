import Link from "next/link";
import { authUserServer } from "@/library/auth-libs";

const userActionButton = async () => {
  const user = await authUserServer();
  const actionLabel = user ? "Sign Out" : "Sign In";
  const actionURL = user ? "/api/auth/signout" : "/api/auth/signin";

  return (
    <div className="flex gap-10 justify-between">
      {user ? <Link href="/user/dashboard" className="bg-color-dark text-color-accent rounded-md px-5 py-1.5">Dashboard</Link> : null}
      <Link
        href={actionURL}
        className="bg-color-dark px-7 py-1.5 text-color-accent rounded-md"
      >
        {actionLabel}
      </Link>
    </div>
  );
};

export default userActionButton;
