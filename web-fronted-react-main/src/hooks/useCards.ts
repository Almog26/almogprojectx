import { useEffect, useState } from "react";
import { CardType } from "../@types/types";
import { getCards } from "../services/cards";
import { AxiosError } from "axios";
import { uniqBy } from "lodash";
// cards/myCards/favoriteCards
export const useCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //SRP:
  useEffect(() => {
    setError(null);
    setLoading(true);
    getCards()
      .then((res) => {
        setCards(uniqBy(res.data, "image.url")as any);
        setError(null);
      })
      .catch((e: AxiosError) => {
        setError(` the problem is ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { cards, loading, error };
};
