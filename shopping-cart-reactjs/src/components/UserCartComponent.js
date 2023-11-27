
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

    
    const [showPopup, setShowPopup] = useState(false);

return (
<div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
   <h2>My Cart</h2>

   
  
    {cartCourses.length === 0 ? (

        
    <p className="empty-cart"> your cart is empty</p>
    ) : (     
<div>
    <ul>
    <ul>
    <h5><img 
        src="//i5.walmartimages.com/dfw/63fd9f59-1b5e/5452ae02-a31f-4ef1-9a45-62ac0b06c13b/v1/mci-shipping.svg" alt="fulfillment logo" width="64" height="64" class="db h-auto"/> Free Shipping </h5>
    

    <p>
                  <strong>Expected shipping delivery (25.11.2023 - 01.12.2023)</strong>
                </p>
                
    </ul>
    
    
  <div title="Title" />;

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
                            <p>Price: ₹{item.product.price} </p> 
                            
                            
                            
            <p className="offer-cart"> Actual Color: Navy </p>
            <p className="offer-cart"> Size: S </p>
            <p className="offer-cart"> Free Holiday returns until Jan 31 </p>
            
            <div className="info-circle" onClick={() => setShowPopup(true)}>
        <p className="info-circle-inner"> i </p> Eligible Promotions
    
</div>
{showPopup && (
  <div className="popup-message">
    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img>  5% Cashback on Flipkart Axis Bank Card.
    <div>
    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img>  10% off on Citi Credit Card EMI Transactions.
    </div>
    <div>
    <img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img>  Buy for 150 get ₹100 off your Next Buy.
   </div>
   
   <button onClick={() => setShowPopup(false)}>Close</button>
  </div>
)}
            
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
          
        
        
    

</div>

            )}
</div>

    );
}


 
export default UserCartComponent;