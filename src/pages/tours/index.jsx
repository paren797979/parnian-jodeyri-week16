import Head from "next/head";
import { http } from "@/services/https";
import TourCards from "@/components/Templates/TourCards";
import SearchBar from "@/components/Module/SearchBar";

export async function getStaticProps() {
  try {
    const data = await http.get("/tour");

    const toursData = data?.data ?? data;
    const tours = Array.isArray(toursData) ? toursData : [];

    return {
      props: {
        tours,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("TOUR API ERROR in getStaticProps:", error);

    return {
      props: {
        tours: [],
      },
      revalidate: 10,
    };
  }
}

export default function ToursPage({ tours }) {
  return (
    <>

      <SearchBar />
      <Head>
        <title>همه تورها</title>
      </Head>

      <main style={{ padding: "2rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>همه تورها</h1>
        {tours.length > 0 ? (
          <TourCards data={tours} />
        ) : (
          <p>در حال حاضر توری برای نمایش وجود ندارد.</p>
        )}
      </main>
    </>
  );
}
