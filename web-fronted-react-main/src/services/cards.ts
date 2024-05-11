import axios, { AxiosError } from "axios";

const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

export const getCards = () => {
  return axios.get(baseUrl);
    
};

export const getCardById = (id: string) => {
  return axios.get(`${baseUrl}/${id}`);
};









