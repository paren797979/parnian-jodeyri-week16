import Footer from "../footer/Footer"; 
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
