import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/header";
import { getAnimeResponse, getNestedAnimeResponse } from "../library/api_lib";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8");
  let recommendedAnime = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry"
  );
  recommendedAnime = shuffleArray(recommendedAnime).slice(0, 4)

  return (
    <>
      <section>
        <Header title="Popular" linkHref="/popular" linkTitle="See All" />
        <AnimeList api={topAnime} />
      </section>
      <section>
        <Header title="Recommended" linkHref="/popular" linkTitle="See All" />
        <AnimeList api={{ data: recommendedAnime }} />
      </section>
    </>
  );
};

export default Page;
