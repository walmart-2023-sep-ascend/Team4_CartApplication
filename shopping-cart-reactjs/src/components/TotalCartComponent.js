//components/TotalCartComponent.js
 
import React from 'react';

function TotalCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    totalAmountCalculationFunction,
    SaveToCartFunction,
    saveForLaterFunction,
    removeFromCartFunction,
    setCartCourses,
}) {

    return (
        <div className="cart-summary">
        <h2>Price details</h2>
        <div className="total">
            <span> Price: </span>
            <span className="totalValue"> ₹{totalAmountCalculationFunction()}</span>
            </div>
        
            <div className="total">
            <span> Discount: </span> 
            <span> 5% </span> 
            </div>

            <div className="total">
                <span> shipping charges: </span>
                <span> Free </span>
            </div>

            <div className="total">
                <span>Taxes: </span>  
                 <span> Calculated at checkout </span>
               </div>
            
            
            <div className="checkout-section">
            <p className="pricelist"><h2>Estimated total:</h2>
                ₹{totalAmountCalculationFunction()}
            </p>
            
            </div>
        <button
            className="checkout-button"
            disabled={cartCourses.length === 0 ||
            totalAmountCalculationFunction() === 0}
        >
            Continue to checkout
        </button>    
    </div>
    )
    
}

 export default TotalCartComponent;