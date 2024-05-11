import { jwtDecode } from "jwt-decode"; // יבוא של פונקציה לפענוח טוקנים
import { createContext, useEffect, useState, useContext } from "react"; // יבוא של פונקציות והוקים מהספריית react

export const AuthContext = createContext({
  isLoggedIn: false, // משתנה המציין האם המשתמש מחובר או לא
  login: (jwt: string) => { }, // פונקציה להתחברות המשתמש
  logout: () => { }, // פונקציה להתנתקות המשתמש
  isBusiness: false,
  isAdmin: false,
});
export const dataSender = () => useContext(AuthContext);
     
// קומפוננטת ספק של Context לשימוש ברחבי האפליקציה
export const AuthContextProvider = ({ children }) => {
  // קבלת הטוקן מתוך ה-localStorage
  const token = localStorage.getItem("token");
  // משתנים סטייט לניהול מצב המשתמש והאם הוא עסוק כעסק או לא
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // קוד שירוץ פעם אחת בעת התקנת הקומפוננטה
  useEffect(() => {
    // בדיקה אם קיים token ב-localStorage
    if (token) {
      // הגדרת המשתנה isLoggedIn ל-true
      setIsLoggedIn(true);
      // פיענוח הטוקן והשמת הערך של isBusiness ממנו
      const decode: any = jwtDecode(token);
      setIsBusiness(decode.isBusiness);
      setIsAdmin(decode.isAdmin);
    }
  }, [token]); // האזנה לשינויים ב-token

  // פונקציה להתחברות המשתמש
  const login = (jwt: string) => {
    // שינוי ה-state שהמשתמש מחובר
    setIsLoggedIn(true);
    // פיענוח הטוקן והשמת הערך של isBusiness ממנו
    const decode: any = jwtDecode(jwt);
    setIsBusiness(decode.isBusiness);
    setIsAdmin(decode.isAdmin);
    // שמירת הטוקן ב־LocalStorage
    localStorage.setItem("token", jwt);
  };

  // פונקציה להתנתקות המשתמש
  const logout = () => {
    // שינוי ה-state שהמשתמש לא מחובר
    setIsLoggedIn(false);
    // הסרת הטוקן מה־LocalStorage
    localStorage.removeItem("token");
  };
  // החזרת רכיב עם Context Provider וערכי הקונטקסט המתאימים
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isBusiness ,isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

