import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../hooks/useTheme";
const Root = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen text-blue-500">
      <Header />
      <main className={`flex-1 ${theme==="light" ? "bg-gray-100" : "bg-gray-500" }`}>
        {/* every link will show here  */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
