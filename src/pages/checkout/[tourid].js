import CheckoutPage from "@/components/Templates/Checkout";
import { http } from "@/services/https";

export default function Checkout({ tourData, error, tourid }) {
  return <CheckoutPage tourData={tourData} error={error} tourid={tourid} />;
}

export async function getServerSideProps(context) {
  const { tourid } = context.query;

  if (!tourid) {
    return {
      props: {
        tourData: null,
        tourid: null,
        error: "اطلاعات تور یافت نشد.",
      },
    };
  }

  try {
    const res = await http.get(`/tour/${tourid}`);

    const tourData = res?.data || res || null;

    if (!tourData || !tourData.id) {
      return {
        props: {
          tourData: null,
          tourid,
          error: "اطلاعات تور یافت نشد.",
        },
      };
    }

    return {
      props: {
        tourData,
        tourid,
        error: null,
      },
    };
  } catch (error) {
    console.error("API Error in checkout page:", error?.message || error);

    return {
      props: {
        tourData: null,
        tourid,
        error: "خطا در دریافت اطلاعات تور.",
      },
    };
  }
}
