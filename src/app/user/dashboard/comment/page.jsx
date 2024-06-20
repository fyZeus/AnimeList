"use client";

import Header from "@/components/Dashboard/Header";
import { authUserServer } from "@/library/auth-libs";
import prisma from "@/library/prisma";
import { Trash } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await authUserServer();

  const comments = await prisma.comment.findMany({
    where: { user_email: user.user_email },
  });

  return (
    <section className="mt-4 w-full">
      <Header title={"My Comment"} />
      <div className="flex justify-end">
        <div className="ml-auto bg-color-accent p-2 mt-8 mx-4 rounded-md cursor-pointer">
          Clear all comment
        </div>
      </div>
      <div className="grid grid-cols-1 px-6 py-4 gap-4">
        {comments.map((comment) => {
          return (
            <Link
              href={`/anime/${comment.anime_mal_id}`}
              key={comment.id}
              className="bg-color-primary text-color-dark p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">{comment.anime_title}</p>
                  <p className="italic">{comment.comment}</p>
                </div>
                <div className="ml-auto">
                  <Trash size={24} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default page;
