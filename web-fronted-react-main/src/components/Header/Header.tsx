import { useTheme } from "../../hooks/useTheme";
import Navbar from "../Navbar/Navbar";
import "./Header.scss";
import { dataSender } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";


function Header() {
//  color change function
const { theme } = useTheme();
const { isBusiness, isAdmin } = dataSender();
const [loaded, setLoaded] = useState(false);
const [color, setColor] = useState("red");

useEffect(() => {
setTimeout(() => {
setLoaded(true);
}, 3000);

setTimeout(() => {
setColor("yellow");
}, 3000);
}, []);

return (
<header className={`${theme === "light" ? "bg-gray-200" : "bg-gray-400"}`}>
{/* Render different headlines based on user role */}
{isAdmin ? (
<h2 className="text-6xl text-center text-blue-500">Admin Dashboard</h2>
) : (
<h2 className={`text-6xl text-center transition-transform ease-in duration-700 delay-100 hover:translate-y-3 ${isBusiness ? "text-yellow-500" : "text-black"}`}>
<span className={`transition-color ease-in duration-700 delay-100 md:text-2xl ${color === "red" ? "text-red-500" : "text-yellow-500"}`}>
{isBusiness ? "Business Workspace" : "Personal Workspace"}
</span>
</h2>
)}


<Navbar />
</header>
);
}

export default Header;
