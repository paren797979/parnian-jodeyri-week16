import React from "react";
import TourCards from "@/components/Templates/TourCards";
import { useRouter } from "next/router";
import { http } from "@/services/https";

export default function FilterPage({ tours = [] }) {
  const router = useRouter();

  if (!router.isReady) return null;

  const [from, to, date] = router.query.slug || [];

  const filteredTours = tours.filter((tour) => {
    const tourDate = new Date(tour.startDate).toISOString().slice(0, 10);

    return (
      tour.origin?.name === from &&
      tour.destination?.name === to &&
      tourDate === date
    );
  });

  return (
    <div>
      {filteredTours.length > 0 ? (
        <TourCards data={filteredTours} />
      ) : (
        <p>هیچ توری با این مشخصات پیدا نشد.</p>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
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
    return {
      props: { tours: [] },
      revalidate: 10,
    };
  }
}
