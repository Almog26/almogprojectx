import { useEffect, useState } from "react";
import { CardType, ErrorType } from "../@types/types";
import { getCardById } from "../services/cards";
import { useParams } from "react-router-dom";
const Card = () => {
  // dynamic route: /cards/:id
  const { id } = useParams();
  const [card, setCard] = useState<CardType>();
  const [error, setError] = useState<ErrorType>();
  useEffect(() => {
    getCardById(id ?? "")
      .then((res) => {
        setCard(res.data);
      })
      .catch((e) => {
        const status = e.response.status;
        const message = e.message;
        const details = e.response.data;

        setError({ status, message, details });
      });
  }, []);

  return error ? (
    <div>
      <h2>{error.message}</h2>
    </div>
  ) : (
    <div className=" w-36 h-28 flex flex-col justify-center items-center mt-8 mx-auto">
      <h2>{card?.email}</h2>
      <p>{card?.subtitle}</p>
      <img src={card?.image.url} alt={card?.image.alt} className="w-22 h-12 rounded-md  " />
    </div>
  );
};
export default Card;

