import ErrorTemplate from "../components/Templates/Error/ErrorTemplate";

export default function Custom500() {
  return (
    <ErrorTemplate
      title="اتصال با سرور برقرار نیست!"
      subTitle="لطفا بعدا دوباره امتحان کنید."
      image="/error500.png" 
    />
  );
}
