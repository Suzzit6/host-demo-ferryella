import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import api from "./api";
import { useLoader } from "./LoaderContext";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setLoading } = useLoader();
  const [userAuth, setuserAuth] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      console.log("Fetching user ....");
      try {
        const token = getCookie("token");
        console.log(token);
        const decodedToken = jwtDecode(token);
        setuserAuth(decodedToken);

        console.log("Decoded token", decodedToken);
        console.log("fetching step 2");
        setLoading(false);

        if (!decodedToken) {
          const response = await api.get("http://localhost:5500/api/user", {
            withCredentials: true,
          });
          console.log("response in fetch", response.data.user);
          // console.log(response.data.user.userCart)

          if (response.data.user) {
            setLoading(false);

            setuserAuth(response.data.user);
          }
          if (response.data.user[0]) {
            setLoading(false);

            setuserAuth(response.data.user[0]);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error while userAuth", error);
      }
    };
    fetchUser();
    const intervalId = setInterval(fetchUser, 5 * 60 * 1000); // every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
//   const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   };

  return (
    <UserContext.Provider value={{ userAuth, setuserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
