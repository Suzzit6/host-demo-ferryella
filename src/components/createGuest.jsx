import axios from "axios";
import { jwtDecode } from "jwt-decode";

// const initGuestUser = async () => {
//   console.log("Guest ID not found creating new id")
//     try {
//       const response = await axios.post('http://localhost:5500/api/create-guest');
//       const guestId = response.data.guestId;
//       localStorage.setItem('guestId', guestId);
//       return guestId;
//     } catch (error) {
//       console.error('Error creating guest user:', error);
//     }
//   };

export const getOrCreateGuestId = async (userAuth) => {
  console.log("in create userauth", userAuth);
  const token = getCookie("token");
  let decodedToken;
  if (token) {
     decodedToken = jwtDecode(token);
  }
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  try {
    if (!userAuth) {
      if (!decodedToken) {
        if (!token) {
          console.log("in not userauth");
          const response = await axios.post(`http://localhost:5500/register`);
          console.log("response.data ", response.data);
          return response.data.userId;
        }
      }
    } else {
      return userAuth?.id;
    }
  } catch (error) {
    console.log("error in guest ", error);
  }
};
