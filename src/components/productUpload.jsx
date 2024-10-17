import React, { useState,useEffect } from "react";
import axios from "axios";

export const ProductUpload = () => {
  const [product, setproduct] = useState({
    Productname: null,
    description: null,
    imgurl: null,
    price: null,
  });
  const [submitted, setsubmitted] = useState(false);

  // const handleChange = (e) =>{
  //
  //     const {name , value} = e.target.value
  //     setproduct({...product, [name]:value})

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product)
      const response = await axios.post("http://localhost:5500/", product);
      console.log("Product added ", response.data);
    } catch (err) {
      console.error("Error adding product ", err);
    }
  };

  useEffect(() => {
    if (submitted) {
      console.log("Product submitted successfully");
      setproduct({
        Productname: null,
        description: null,
        imgurl: null,
        price: null,
      });
      setsubmitted(false);
    }
  }, [submitted]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={product.Productname}
        onChange={ (e)=> setproduct({...product,Productname:e.target.value})}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={(e)=> setproduct({...product,description:e.target.value})}
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={(e)=> setproduct({...product,price:e.target.value})}
        required
      />
      <input
        type="text"
        name="imgurl"
        placeholder="Image URL"
        value={product.imgurl}
        onChange={(e)=> setproduct({...product,imgurl:e.target.value})}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

