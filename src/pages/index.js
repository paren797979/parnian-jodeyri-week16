import Head from "next/head";
import { http } from "@/services/https";
import TourCards from "@/components/Templates/TourCards";
import SearchBar from "@/components/Module/SearchBar";
import ContactBanner from "@/components/Templates/ContactBanner";
import WhyTorio from "@/components/Templates/WhyTorio";
import Advantages from "@/components/Module/Advantages";
import styles from "../styles/Home.module.css"

export default function Home({ tours = [] }) {
  return (
    <>
      <Head>
        <title>تورینو | رزرو تور مسافرتی</title>
        <meta name="description" content="سامانه رزرو آنلاین تور" />
      </Head>

      <main>
        <section className={styles.heroSection}>
       <img src="/background.png" alt="تورینو بک‌گراند" className={styles.heroImage} />
       </section>

        <SearchBar />
        <TourCards data={tours} />
        <ContactBanner />
        <WhyTorio />
        <Advantages/>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const tours = await http.get("/tour");

    return {
      props: {
        tours: Array.isArray(tours) ? tours : [],
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
