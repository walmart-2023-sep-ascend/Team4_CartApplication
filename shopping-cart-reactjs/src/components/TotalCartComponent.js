import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function TotalCartComponent({
    cartCourses,
    totalAmountCalculationFunction,
    })
    {
    const [discountApplied, setDiscountApplied] = useState(false);
    const [promotionApplied, setPromotionApplied] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = () => {
      navigate('/empty-page');
    };

    const applyDiscount = () => {
        // Set the discount applied flag to true
        setDiscountApplied(true);
        setPromotionApplied(true);
    };

    const removeDiscount = () => {
        // Set the discount applied flag to false
        setDiscountApplied(false);
        setPromotionApplied(false);
    };

    const calculateTotalAmount = () => {
        // Calculate the total amount after applying the discount
        const total = totalAmountCalculationFunction() - (discountApplied ? totalAmountCalculationFunction() * 0.1 : 0);
        return total;
    };

    return (
        <div className="cart-summary">
            

            <h2>Price details</h2>
            <div className="total">
                <span> Price: </span>
            </div>
            <div className="total1">
                <span> ₹{totalAmountCalculationFunction()} </span>
            </div>

            <div className="total">
                
                {promotionApplied ? (
                         <span> </span>
                    ) : (
                     <div>
                 <p>Eligible for 10% discount</p>
        </div>
      )}

            </div>
            <div className="total1">
                {discountApplied ? (
                    <>
                        {promotionApplied && (
                            <div className="promotion-applied">
                                Congratulations !! Promotion Applied
                            </div>
                        )}
                        <button className='Promo' onClick={removeDiscount}>Remove</button>
                    </>
                ) : (
                    <button className='Promo' onClick={applyDiscount}>Apply</button>
                )}
            </div>

            <div className="total">
                <span> Shipping charges: </span>
            </div>
            <div className="total1">
                <span> Free </span>
            </div>

            <div className="total">
                <span> Taxes: </span>
            </div>
            <div className="total2">
                <span> Calculated at checkout </span>
            </div>

            <div className="total">
                <span>
                    <h3>Estimated total:</h3>
                </span>
            </div>
            <div className="total3">
                <span> ₹{Math.round(calculateTotalAmount())} </span>
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