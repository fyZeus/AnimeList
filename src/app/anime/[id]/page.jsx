import CollectionButton from "@/components/AnimeList/CollectionButton";
import VideoPlayer from "@/components/Utilities/VideoPlayer";
import { authUserServer } from "@/library/auth-libs";
import prisma from "@/library/prisma";
import Image from "next/image";
import CommentInput from "../../../components/AnimeList/CommentInput";
import CommentBox from "@/components/AnimeList/CommentBox";

const { getAnimeResponse } = require("@/library/api_lib");
const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`);
  const user = await authUserServer();
  const collection = await prisma.collection.findFirst({
    where: { user_email: user?.email, anime_mal_id: id },
  });

  return (
    <>
      <div className="pt-4 px-4 ">
        <h3 className="text-color-primary text-2xl">
          {anime.data.title} - {anime.data.year}
        </h3>
      </div>
      <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border">
          <h3>Rank</h3>
          <p>{anime.data.rank}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border">
          <h3>Score</h3>
          <p>{anime.data.score}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border">
          <h3>Member</h3>
          <p>{anime.data.members}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border">
          <h3>Episode</h3>
          <p>{anime.data.episodes}</p>
        </div>
        {/* <button>
        <ArrowCircleRight size={32} />
        </button> */}
      </div>
      <div className="justify-center text-center items-center mt-4 ">
        {!collection && user && (
          <CollectionButton
            anime_mal_id={id}
            user_email={user?.email}
            anime_images={anime.data.images.webp.image_url}
            anime_title={anime.data.title}
          />
        )}
      </div>

      <div className="pt-4 px-4 flex gap-4 text-color-primary sm:flex-nowrap flex-wrap">
        <Image
          src={anime.data.images.webp.image_url}
          alt={anime.data.images.jpg.image_url}
          width={250}
          height={250}
          className="w-full rounded objec-cover"
        />
        <p className="text-justify text-xl">{anime.data.synopsis}</p>
      </div>
      <div className="p-4">
        <CommentBox anime_mal_id={id} />
        {user && (
          <CommentInput
            anime_mal_id={id}
            user_email={user?.email}
            username={user?.name}
            anime_title={anime.data.title}
          />
        )}
      </div>
      <div>
        <VideoPlayer videoId={anime.data.trailer.youtube_id} />
      </div>
    </>
  );
};

export default Page;
