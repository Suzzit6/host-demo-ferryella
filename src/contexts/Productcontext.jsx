import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
// import { fetchProductData, removeFromProduct } from './ProductSlice';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [AllProduct, setProduct] = useState([]);
  const [Results , setResults] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      console.log("Fetching Product ....");
      try {
        console.log("fetching step 2");

        const response = await axios.get(
          `http://localhost:5500/api/fetch-Product`
        );
        console.log("response in fetchproduct", response.data);
        setProduct(response.data);
        // console.log(response.data.user.userProduct)
      } catch (error) {
        console.log("error while Product", error);
      }
    };
    fetchProduct();
    const interval = setInterval(fetchProduct, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Product ", AllProduct);
  }, [AllProduct]);

  return (
    <ProductContext.Provider value={ {AllProduct , setProduct ,Results,setResults}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
