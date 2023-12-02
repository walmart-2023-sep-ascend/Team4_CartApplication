import React, { Component, useEffect, useState } from 'react';
import cartService from '../services/cartService';

function UserCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    totalAmountCalculationFunction,
    SaveToCartFunction,
    saveForLaterFunction,
    removeFromCartFunction,
    setCartCourses,
    addCourseToCartFunction,
    getCart
}) {

    const [deliveryDate, setDeliveryDate] = useState(null);

    useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 3);
      const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setDeliveryDate(formattedDeliveryDate);
    };
    calculateDeliveryDate();
  }, []);



    const [showOffers, setShowOffers] = useState(false);

    const toggleOffers = () => {
        setShowOffers(!showOffers);
    };

    return (
        <div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
            <h2>My Cart</h2>

            {cartCourses.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        <h5>
                            <img
                                src="//i5.walmartimages.com/dfw/63fd9f59-1b5e/5452ae02-a31f-4ef1-9a45-62ac0b06c13b/v1/mci-shipping.svg"
                                alt="fulfillment logo"
                                width="64"
                                height="64"
                                className="db h-auto"
                            />
                            Free Shipping
                        </h5>

                        <p>
                            <strong>Expected shipping delivery ({deliveryDate})</strong>
                        </p>
                    </ul>

                    {cartCourses.map((item) => (
                        <li key={item.product.id} className="cart-item">
                            <div>
                                <div className="item-info">
                                    <div className="item-image">
                                        <img src={item.product.image} alt={item.product.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.product.name}</h3>
                                        <p>Price: ₹{item.product.price} </p>
                                        <li>
                                    <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 10% off on all courses</span>
                                </li>
                                <li>
                                    <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> Buy 2 courses, get 1 free</span>
                                </li>
                                        {showOffers ? (
                            <>
                            
                                <li>
                                    <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> Buy for 100 get ₹75 off your Next Buy </span>
                                </li>
                                <li>
                                    <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> Bank Offer5% Cashback on Flipkart Axis Bank Card </span>
                                </li>
                                <li>
                                    <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 20% cashback on selected courses</span>
                                </li>
                                
                                <button onClick={toggleOffers}>Less</button>
                            </>
                        ) : (
                            <div className="popup-message">
                            <button onClick={toggleOffers}> View 3 more offers</button>
                            </div>
                        )}
                        
                            
                                        <p className="offer-cart"> Actual Color: Navy </p>
                                        <p className="offer-cart"> Size: S </p>
                                        <p className="offer-cart"> Free Holiday returns until Jan 31 </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="item-actions">
                                        <button
                                            className="remove-button"
                                            onClick={() => deleteCourseFromCartFunction(item.product)}
                                        >
                                            REMOVE
                                        </button>
                                        <button
                                            className="Save-to-cart-button"
                                            onClick={() => saveForLaterFunction(item.product)}
                                        >
                                            SAVE FOR LATER
                                        </button>
                                        <div className="quantity">
                                            <button
                                                style={{ margin: '1%' }}
                                                onClick={(e) => {
                                                
                                                    setCartCourses((prevCartCourses) => {
                                                        const updatedCart = prevCartCourses.map((prevItem) =>
                                                            prevItem.product.id === item.product.id
                                                                ? { ...prevItem, quantity: item.quantity + 1 }
                                                                : prevItem
                                                        );
                                                        
                                                        addCourseToCartFunction(item)
                                                        console.log("item"+JSON.stringify(item))
                                                        return updatedCart;
                                                    });
                                                    }}
                                            >
                                                +
                                            </button>
                                            <p className="quant">{item.quantity} </p>
                                            <button
                                                onClick={(e) => {
                                                    setCartCourses((prevCartCourses) => {
                                                        const updatedCart = prevCartCourses.map((prevItem) =>
                                                            prevItem.product.id === item.product.id
                                                                ? {
                                                                      ...prevItem,
                                                                      quantity: Math.max(item.quantity - 1, 0),
                                                                  }
                                                                : prevItem
                                                        );
                                                        return updatedCart;
                                                    });
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}

<p className="offer-new"> Sold and shipped by Walmart </p>
          
                </div>
            )}
        </div>
    );
}

export default UserCartComponent;