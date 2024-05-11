// מייבאים את הספריות הנדרשות
import axios from "axios"; // ספריית axios משמשת לבצע בקשות HTTP
import { LoginUser, RegisterUser } from "../@types/types"; // ייבוא סוגי הנתונים LoginUser ו-RegisterUser מקובץ סוגי הנתונים
import { useEffect } from "react"; // ייבוא הפונקציה useEffect מהספרייה react
import { CardType } from "../@types/types";


// הגדרת כתובת ה-URL הבסיסית וכתובתי ה-URL השונות
export const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2"; // הגדרת כתובת ה-URL הבסיסית
export const usersUrl = `${baseUrl}/users`; // הגדרת כתובת ה-URL למשתמשים
export const loginUrl = `${baseUrl}/users/login`; // הגדרת כתובת ה-URL להתחברות
export const newCardsUrl = `${baseUrl}/cards`; // הגדרת כתובת ה-URL לכרטיסים
// פונקציה לרישום משתמש חדש
// export function register(data: RegisterUser) {
//   return axios.post(usersUrl, data); // ביצוע בקשת POST לכתובת ה-URL של המשתמשים עם הנתונים שנשלחו
// }


export const  register = (data: RegisterUser)=>{
    return axios.post(usersUrl,data)
}

export const login=(data:LoginUser)=>{
   return axios.post(loginUrl,data);
   
} 
// פונקציה לקבלת פרטי משתמש על פי זיהוי מזהה ייחודי
export function userDetails(id: string) {
  const url = `${usersUrl}/${id}`; // בניית כתובת ה-URL לפי המזהה הייחודי של המשתמש
  return axios.get(url, { // ביצוע בקשת GET לכתובת ה-URL עם הכותרת 'x-auth-token' המכילה את האסימון שנשמר בלוקל סטורג'
    headers: {
      "x-auth-token": localStorage.getItem("token"), // הוספת כותרת 'x-auth-token' עם האסימון השמור בלוקל סטורג'
    },
  });
}
 

export const CreateCard = (data: CardType) => {

  return  axios.post(newCardsUrl, data,{ // ביצוע בקשת GET לכתובת ה-URL עם הכותרת 'x-auth-token' המכילה את האסימון שנשמר בלוקל סטורג'
      headers: {
          "x-auth-token": localStorage.getItem("token"), // הוספת כותרת 'x-auth-token' עם האסימון השמור בלוקל סטורג'
      },
  })
       .then((res) => {
           console.log("almog",res);
       }).catch((e) => {
           console.log("ggggß",e);
       });
}
// הגדרת אובייקט auth המכיל את הפונקציות של הרישום, ההתחברות וקבלת פרטי המשתמש
const auth = {
  register, // פונקציה לרישום משתמש חדש
  login, // פונקציה להתחברות משתמש קיים
  userDetails, // פונקציה לקבלת פרטי המשתמש
  CreateCard,

};

export default auth; // ייצוא של אובייקט המכיל את כל הפונקציות קשורות לאימות
