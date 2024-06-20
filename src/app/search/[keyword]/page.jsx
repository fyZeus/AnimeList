import AnimeList from "@/components/AnimeList";
import Link from "next/link";
import Header from "@/components/AnimeList/header";
import { getAnimeResponse } from "@/library/api_lib";

const Page = async ({ params }) => {
    const { keyword } = params
    const decodedKeyword = decodeURI(keyword)
    const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`)

    return (
        <>
            <section>
                <Header title={`Search for ${decodedKeyword}...`}/>
                <AnimeList api={searchAnime} />
            </section>
        </>
    );
}

export default Page
