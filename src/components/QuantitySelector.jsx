import React, { useState } from 'react';

const QuantitySelector = ({ quantity, setQuantity }) => {
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
      };
    
      const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
      };
    
      const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
          setQuantity(value);
        }
      };

  return (
      <div className="wrapQtyBtn">
        <div className="qtyField">
          <button 
            className="qtyBtn minus" 
            onClick={decreaseQuantity}
            type="button"
          >
            <i className="fa anm anm-minus-r" aria-hidden="true" />
          </button>
          <input
            type="text"
            id="Quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="product-form__input qty"
          />
          <button 
            className="qtyBtn plus" 
            onClick={increaseQuantity}
            type="button"
          >
            <i className="fa anm anm-plus-r" aria-hidden="true" />
          </button>
        </div>
      </div>
  );
};

export default QuantitySelector;