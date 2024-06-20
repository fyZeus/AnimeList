import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Dashboard/header";
import { authUserServer } from "@/library/auth-libs";
import prisma from "@/library/prisma";

const Page = async () => {
  const user = await authUserServer();
  const collection = await prisma.collection.findMany({
    where: { user_email: user.email },
  });

  return (
    <section className="mt-4 w-full">
      <Header title={"My Collection"} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collection.map((collect, index) => {
          return (
            <Link
              key={index}
              href={`/anime/${collect.anime_mal_id}`}
              className="relative"
            >
              <Image
                src={collect.anime_images}
                width={350}
                height={350}
                className="w-full"
              />
              <div className="absolute flex items-center justify-center bottom-0 w-full bg-color-accent h-16">
                <h3 className="text-xl text-center">{collect.anime_title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Page;
