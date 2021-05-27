import DeptButtons from "./DeptButtons";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, departments }) => {
  return (
    <div className="flex justify-center bg-gray-200">
      <div className="max-w-screen-lg flex flex-col min-h-screen w-full">
        <Navbar />
        <DeptButtons departments={departments} />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
      ></div>
    </div>
  );
};

export default Layout;
