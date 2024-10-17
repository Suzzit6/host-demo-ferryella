import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProviderHeader = ({ children }) => {
  const [parentheaders, setparentheaders] = useState();
  const [topics, settopics] = useState();
  const [dynamicContent, setDynamicContent] = useState({});

  useEffect(() => {
    const handlegetheaders = async () => {
      try {
        const response = await axios.get("http://localhost:5500/get-headers");
        const headers = response.data.headers;
        // console.log( "Headers",headers.splice(22))
        setparentheaders(headers);
        const alltopics = response.data.alltopics;
        settopics(alltopics);
        const allheaders = response.data.allheaders;

        // console.log(allheaders)
        // const updated =   updateDynamicContent(allheaders);
        const newContent = {};

        allheaders.forEach((item) => {
          if (item.content) {
            const normalizedKey = item.content.replace(/\s+/g, "-").toLowerCase();
            newContent[normalizedKey] = item.content;
            // console.log(`Processing item: ${item.key} -> ${normalizedKey}: ${item.content}`);
          } else {
            console.warn("Invalid item:", item);
          }
        });

        // console.log("Processed content:", newContent);
        setDynamicContent(newContent);
      } catch (error) {
        console.log("error while getting headers ", error);
      }
    };
    handlegetheaders();
    const intervalId = setInterval(handlegetheaders, 20000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <UserContext.Provider
      value={{
        topics,
        settopics,
        parentheaders,
        setparentheaders,
        dynamicContent,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useHeader = () => useContext(UserContext);
