import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCards } from "../hooks/useCards";
import { useTheme } from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Spinners from "../components/Spinners";

export const FavoriteCards = () => {
  const { cards, loading, error } = useCards();
  const { theme } = useTheme();
  const [clickedStates, setClickedStates] = useState<boolean[]>([]);

  useEffect(() => {
    const savedClickedStates = JSON.parse(localStorage.getItem("clickedStates") || "[]");
    setClickedStates(savedClickedStates);
  }, []);

  const toggleClickedState = (index: number) => {
    const newState = [...clickedStates];
    newState[index] = !newState[index];
    setClickedStates(newState);
    localStorage.setItem("clickedStates", JSON.stringify(newState));
  };

  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-800"} min-h-screen flex flex-col justify-center items-center`}>
      {loading && <Spinners />}
      {error && <div>{error}</div>}

      {cards.map((c, index) => (
        clickedStates[index] && (
          <div key={c._id} className="shadow-2xl p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto rounded-md my-4">
            <Link to={`/cards/${c._id}`} className="block mb-4">
              <h2 className="text-xl font-semibold">{c.title}</h2>
              <p className="text-gray-600">{c.subtitle}</p>
              <img src={c.image.url || ""} alt={c.image.alt || ""} className="mt-4 mx-auto w-full max-h-48 object-cover" />
            </Link>
            <Link to={`update/${c._id}`} className="block text-blue-500">UPDATE</Link>
            <FontAwesomeIcon icon={faHeart} onClick={() => toggleClickedState(index)} className={`text-2xl cursor-pointer ${clickedStates[index] ? "text-red-500" : "text-gray-500"}`} />
          </div>
        )
      ))}
    </div>
  );
};

export default FavoriteCards;
