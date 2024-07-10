import Footer from "./Footer";
import Header from "./Header";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default BasicLayout;
