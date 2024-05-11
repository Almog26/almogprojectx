import React, { useState } from 'react';
import { FaHome, FaBars } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { NavLink, useNavigate } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { dataSender } from '../../contexts/AuthContext';

const Navbar = () => {
const { logout, isLoggedIn, isBusiness, isAdmin } = dataSender();
const navigate = useNavigate();
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

return (
<nav className="bg-dark p-4">
<div className="max-w-screen-xl mx-auto flex md:justify-between  items-center">
<div className="flex items-center">

{!isMenuOpen && (
<NavLink to="/" className="brand text-white items-center hidden md:block">
<div className="flex items-center flex-col">
<FaHome className="mr-2" />
Home
</div>
</NavLink>
)}

</div>
<div className="relative z-20 text-center w-4 h-4">
<button onClick={toggleMenu} className="text-red-500 md:hidden absolute ">
<FaBars />
</button>

</div>
<div className="flex items-center">
<div className={`md:flex flex-col flex flex-wrap  
md:flex-row md:items-center ${isMenuOpen ? 'block' : 'hidden'}`} >
<NavLink to="/" className="text-white py-2 px-4 md:hidden block"> Home</NavLink>
{(isBusiness || isAdmin) && <NavLink to="/about" className="text-red-500 py-2 px-4">About</NavLink>}
{isBusiness && (
<>
<NavLink to="/favoriteCards" className="text-red-500 py-2 px-4">Favorite Cards</NavLink>
<NavLink to="/create" className="text-red-500 py-2 px-4">create card</NavLink>
</>
)}


{!isLoggedIn ? (
<>
<NavLink to="/register" className="text-red-500 py-2 px-4">Register</NavLink>
<NavLink to="/login" className="text-red-500 py-2 px-4">Login</NavLink>
</>
) : (
<>
<button onClick={() => {
logout();
navigate("/login");
}} className="text-white py-2 px-4">
Logout
</button>
<NavLink to="/profile" className="text-white py-2 px-4 flex items-center">
<RxAvatar className="mr-2" />
Profile
</NavLink>
</>
)}

<DarkModeToggle />
</div>
</div>
</div>
</nav>
);
};

export default Navbar;
