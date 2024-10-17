import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [Info, setInfo] = useState({});

    useEffect(() => {
        const handletax = async () =>{
            const responsegst = await axios.get("http://localhost:5500/admin/edit-tax")
            console.log("response gst ", responsegst.data.details);
            setInfo(responsegst.data.details)
           }
           handletax()
         const intervalId = setInterval(handletax, 20000);

    return () => clearInterval(intervalId);
    }, []);

    return (
        <InfoContext.Provider
          value={{
            Info,
            setInfo,
          }}
        >
          {children}
        </InfoContext.Provider>
      );

    }

 export const useInfo = () => useContext(InfoContext);
