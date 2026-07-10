import { useRouter } from "next/router";
import { http } from "../../services/https";
import DetailsPage from "@/components/Templates/DetailsPage";

function TourDetails({ tourData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h3>Loading Page...</h3>;
  }

  return (
   <DetailsPage {...tourData}/>
  );
}

export default TourDetails;

export async function getStaticPaths() {
  const toursData = await http.get("/tour");  

  const paths = toursData.map((tour) => ({
    params: { tourid: tour.id.toString() }
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { tourid } = params;

  const tourData = await http.get(`/tour/${tourid}`);

  if (!tourData || !tourData.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tourData },
    revalidate: 10,
  };
}
