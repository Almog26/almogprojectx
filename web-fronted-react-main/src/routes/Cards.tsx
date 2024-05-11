import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useCards } from '../hooks/useCards';
import { useTheme } from '../hooks/useTheme';
import Spinners from '../components/Spinners';

export const Cards = () => {
const { cards, loading, error } = useCards();
const { theme } = useTheme();
const [clickedStates, setClickedStates] = useState(cards.map(() => false));
const [validCards, setValidCards] = useState<any[]>([]);

const toggleClickedState = (index: number) => {
setClickedStates((prevClickedStates) => {
const newState = [...prevClickedStates];
newState[index] = !newState[index];
localStorage.setItem("clickedStates", JSON.stringify(newState));
return newState;
});
};

useEffect(() => {
const fetchValidCards = async () => {
const filteredCards = await filterCards(cards);
setValidCards(filteredCards);
};
fetchValidCards();
}, [cards]);



const filterCards = async (cards: any[]) => {
const promises = cards.map(async (c) => {
if (c.image && c.image.url && c.image.url.startsWith('https://')) {
return await isUrlValid(c.image.url);
}
return false;
});
const results = await Promise.all(promises);
return cards.filter((_, index) => results[index]);
};

const isUrlValid = async (url: string) => {
try {
const response = await fetch(url, { method: 'HEAD' });
return response.ok;
} catch (error) {
return false;
}
};
return (
<div className={`${theme === "light" ? "bg-gray-100" : "bg-gray-800"} min-h-screen flex flex-col justify-center items-center`}>
{loading && <Spinners />}
{error && <div>{error}</div>}
{validCards.map((c, index) => (
<div key={c._id} className="shadow-2xl p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto rounded-md my-4">
<Link to={`/cards/${c._id}`} className="block mb-4">
<h2 className="text-xl font-semibold">{c.title}</h2>
<p className="text-gray-600">{c.subtitle}</p>
<Link to={`/update/${c._id}`}> UPDATE</Link>
<img src={c.image.url} alt={c.image.alt} className="mt-4 mx-auto w-full max-h-48 object-cover" />
</Link>

<FontAwesomeIcon icon={faHeart} onClick={() => toggleClickedState(index)} className={`text-2xl cursor-pointer ${clickedStates[index] ? "text-red-500" : "text-gray-500"}`} />
</div>
))}
</div>
);
};















