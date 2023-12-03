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
            </div>
            <div className="total1">
            <span>  ₹{totalAmountCalculationFunction()} </span>
            </div>
        
            <div className="total">
            <span> Discount: </span> 
            </div>
            <div className="total1">
            <span> 5% </span> 
            </div>

            <div className="total">
                <span> shipping charges: </span>
                </div>
                <div className="total1">
                <span> Free </span>
            </div>

            <div className="total">
                <span>Taxes: </span>  
                </div>
                <div className="total2">
                 <span> Calculated at checkout </span>
               </div>
            
            
            <div className="total">
            <span> <h3>Estimated total:</h3> </span>
            </div>
            <div className="total3">
            <span>   ₹{totalAmountCalculationFunction() } </span>
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