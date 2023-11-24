
import React, {Component,useEffect, useState} from 'react'
import cartService from '../services/cartService';


 
function UserCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    totalAmountCalculationFunction,
    SaveToCartFunction,
    saveForLaterFunction,
    removeFromCartFunction,
    setCartCourses,
    getCart
}) {

return (
<div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
   <h2>My Cart</h2>
  
    {cartCourses.length === 0 ? (
    <p className="empty-cart"> your cart is empty</p>
    ) : (     
<div>
    <ul>
    
    <div className="offer-cart1"> 
    <span>Free shipping, arrives  tomorrow,  Oct 14 </span> 
    </div>
    <div className="offer-cart1"> 
    <span>Order  within  3  hr 17  min </span>
    </div>  
        {cartCourses.map((item) => (
            
            <li key={item.product.id} className="cart-item">
                <div>
                
                    <div className="item-info">
                        <div className="item-image">
                            <img src={item.product.image}
                                 alt={item.product.name} />
                        </div>
                        <div className="item-details">
                            <h3>{item.product.name}</h3>
                            <p>Price: ₹{item.product.price}</p>
                            
                            
                            
            <p className="offer-cart"> Actual Color: Navy </p>
            <p className="offer-cart"> Size: S </p>
            <p className="offer-cart"> Free Holiday returns until Jan 31 </p>
            
            
                        </div>
                    </div>
                    <div>
                        <div className="item-actions">
                            <button
                                className="remove-button"
                                onClick={() =>
                                deleteCourseFromCartFunction(item.product)}>
                                REMOVE
                            </button>
                            <button
                            className="Save-to-cart-button"
                            onClick={() => saveForLaterFunction(item.product)}
                        >
                            SAVE FOR LATER
                        </button>
                            <div className="quantity">
                                <button style={{ margin: "1%" }}
                                    onClick={(e) => {
                                    setCartCourses((prevCartCourses) => {
                                        const updatedCart = prevCartCourses.map(
                                        (prevItem) =>
                                          prevItem.product.id === item.product.id
                                                ? { ...prevItem, quantity:
                                                item.quantity + 1 }
                                                : prevItem
                                        );
                                        return updatedCart;
                                    })
                                }}>+</button>
                                <p className='quant'>{item.quantity} </p>
                                <button
                                    onClick={(e) => {
                                    setCartCourses((prevCartCourses) => {
                                        const updatedCart = prevCartCourses.map(
                                        (prevItem) =>
                                        prevItem.product.id === item.product.id
                                                ? { ...prevItem, quantity:
                                                Math.max(item.quantity - 1, 0) }
                                                : prevItem
                                        );
                                        return updatedCart;
                                    })
                                }}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        ))}

          <p className="offer-new"> Sold and shipped by Walmart </p>
          </ul>
          
        <div className="cart-summary">
        <h2>Price details</h2>
        <div className="total">
            <span> Price: </span>
            <span>  ₹{totalAmountCalculationFunction()} </span>
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
                ₹{totalAmountCalculationFunction() - 100/5}
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
        
    

</div>
            )}
</div>

    );
}


 
export default UserCartComponent;