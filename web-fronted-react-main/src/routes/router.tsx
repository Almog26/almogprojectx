import AboutPage from "../components/AboutPage/AboutPage.tsx";
import  Register  from "./Register.tsx";
import Login from "./Login.tsx";
import { Cards } from "./Cards.tsx";
import Error from "./Error.tsx";
import Card from "./Card.tsx";
import Playground from "./Playground.tsx";
import Practice from "./Practice.tsx";
import Root from "../layouts/Root.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Profile from "./Profile.tsx";
import { createBrowserRouter } from "react-router-dom";
import FavoriteCards from "./FavoriteCards.tsx";
import UpdateCard from "./UpdateCard.tsx";
import CreatCard from "./CreatCard.tsx";

export const router = createBrowserRouter([
{
path: "/",
element: <Root />,
errorElement: <Error />,
children: [
{ index: true, element: <Cards /> },
{ path: "/register", element: <Register /> },
{ path: "/login", element: <Login /> },
{ path: "/cards", element: <Cards /> },
{ path: "/cards/:id", element: <Card /> },
{ path: "/about", element: <AboutPage /> },
{ path: "/update/:id", element: <UpdateCard /> },
{ path: "/create", element: <CreatCard /> },
{ path: "/favoriteCards", element: <FavoriteCards /> },
{
path: "/profile",
element: (
<ProtectedRoute>
<Profile />
</ProtectedRoute>
),
},
{
path: "/playground",
element: <Playground />,
},
{ path: "/practice", element: <Practice /> },
],
},
])




// `http://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`