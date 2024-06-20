import { authUserServer } from "@/library/auth-libs";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const user = await authUserServer();
  return (
    <div className="mt-5 flex flex-col justify-center items-center text-color-primary">
      <h5 className="text-2xl font-bold">Welcome, {user.name}</h5>
      <Image
        src={user?.image}
        alt="..."
        width={250}
        height={250}
        className="rounded-full"
      />
      <div className="py-8 flex gap-6">
        <Link
          href="/user/dashboard/collection"
          className="bg-color-accent text-color-dark py-2 px-3 rounded-md font-bold text-xl"
        >
          My Collection
        </Link>
        <Link
          href="/user/dashboard/comment"
          className="bg-color-accent text-color-dark py-2 px-3 rounded-md font-bold text-xl"
        >
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default Page;
