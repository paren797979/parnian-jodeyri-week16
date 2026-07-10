import ErrorTemplate from "../components/Templates/Error/ErrorTemplate";

export default function Custom404() {
  return (
    <ErrorTemplate
      title="صفحه مورد نظر یافت نشد!"
      image="/error404.png"
      buttonText="بازگشت به صفحه اصلی"
    />
  );
}
