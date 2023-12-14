import React, { Component, useEffect, useState } from 'react';
import cartService from '../services/cartService';

function UserCartComponent({
    cartCourses,
    deleteCourseFromCartFunction,
    saveForLaterFunction,
    increaseQtyFunction,
    decreaseQtyFunction,
    TotalCartComponent,
    setCartCourses,
}) {

    const [promo, setPromo] = useState([])
    const getPromo =()=>{
        cartService.getPromotions().then((response) => {
          setPromo(response.data)
        });
      };


    const [deliveryDate, setDeliveryDate] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [buttonClicked, setButtonClicked] = useState(false);
    const [appliedDiscounts, setAppliedDiscounts] = useState({});

    

    useEffect(() => {
        getPromo();
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


    const handleButtonClick = (item) => {
        setButtonClicked(true);
        setSelectedProduct(item.product);
    
         // Calculate the discounted price
         const discountedPrice = item.product.price * (1 - item.product.discount/100 );

         // Update the appliedDiscounts state
         setAppliedDiscounts((prevDiscounts) => ({
             ...prevDiscounts,
             [item.product.id]: discountedPrice,
         }));
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
                                        

                                        <p> Price: ₹{item.product.price}  </p>


                                        
                                        <p> {item.product.offers} </p>
                                        
                                        

                                        
                                          
                                                        
                                        
                                       
                                        <p className="offer-cart"> Free 7 days returns </p>
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
                                                onClick={() => increaseQtyFunction(item.product)}
                                            >
                                                +
                                            </button>
                                            <p className="quant">{item.quantity} </p>
                                            <button
                                            onClick={() => decreaseQtyFunction(item.product)}
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