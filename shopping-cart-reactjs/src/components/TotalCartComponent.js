import React, { useState } from 'react';
import cartService from '../services/cartService';
import { useNavigate } from 'react-router-dom';

function TotalCartComponent({
  cartCourses,
  deleteCourseFromCartFunction,
  totalAmountCalculationFunction,
  totalAmountdiscountFunction,
  SaveToCartFunction,
  saveForLaterFunction,
  removeFromCartFunction,
  setCartCourses,
  addCourseToCartFunction,
}) {
  const [invalid, setInvalid] = useState(false);
  const [errorMessag, setErrorMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Perform any necessary actions before redirecting (e.g., saving data, clearing the cart)

    // Redirect to the empty page
    navigate('/empty-page');
  };

  const handleApplyPromoCode = () => {
    cartService
      .getDiscount(promoCode)
      .then((response) => {
        console.log("response" + response.data.data.promoPercentage);
        setDiscount(response.data.data.promoPercentage);
        setInvalid(false);
        setPromoCode(''); // Clear the input box
        setErrorMessage('Congratulations !! Promotion Applied');
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage('Sorry!! Invalid promo code');
          console.log(errorMessag);
          setInvalid(true);
          setDiscount(0);
        } else if (error.request) {
          console.error('No response received:', error.request);
          setErrorMessage('No response received from the server. Please check your internet connection.');
          setInvalid(true);
          setDiscount(0);
        } else {
          setErrorMessage('Sorry! Invalid promo code');
          setInvalid(true);
          setDiscount(0);
        }
      });

    if (!invalid) {
      setDiscount(discount);
      console.log("call add to cart");
      // addCourseToCartFunction(cartCourses)
    }
  };

  const getTotalAmountWithDiscount = () => {
    let total = totalAmountCalculationFunction() - (totalAmountCalculationFunction() * discount) / 100;
    return total > 0 ? total : 0;
  };

  return (
    <div className="cart-summary">
      <h2>Price details</h2>
      <div className="total">
        <span>Price: </span>
      </div>
      <div className="total1">
        <span>₹{totalAmountCalculationFunction()}</span>
      </div>

      <div className="total">
        <span>promoCode:</span>
      </div>
      <div className="total1">
        <input
          type="text"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={handleApplyPromoCode}>Apply</button>
      </div>
      <div className="total5">
      {discount > 0 && !invalid && <p>Congratulations !! Promotion Applied</p>}
      {invalid && <p>{errorMessag}</p>}
      </div>

      <div className="total5">
        <a href="http://172.203.170.91:9404/">
          Click here to view promotions
        </a>
      </div>

      <div className="total">
        <span>Discount: </span>
      </div>
      <div className="total2">
        <span>{discount}%</span>
      </div>

      <div className="total">
        <span>shipping charges: </span>
      </div>
      <div className="total1">
        <span>Free</span>
      </div>

      <div className="total">
        <span>Taxes: </span>
      </div>
      <div className="total2">
        <span>Calculated at checkout</span>
      </div>

      <div className="total">
        <h3>Estimated total:</h3>
      </div>
      <div className="total3">
        <span>₹{getTotalAmountWithDiscount()}</span>
      </div>

      <button
        className="checkout-button"
        disabled={cartCourses.length === 0 || totalAmountCalculationFunction() === 0}
        onClick={handleCheckout}
      >
        Continue to checkout
      </button>
    </div>
  );
}

export default TotalCartComponent;