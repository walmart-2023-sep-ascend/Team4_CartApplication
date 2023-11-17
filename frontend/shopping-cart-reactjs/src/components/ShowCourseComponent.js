//components/ShowCourseComponent.js
import React, { useState, useEffect }  from 'react';
import cartService from '../services/cartService';





function ShowCourseComponent({ courses,
    filterCourseFunction,
    addCourseToCartFunction }) {


   
       
        



    return (
        <header className="App-header1">
            <h2> Recommended with your order</h2>
        <div className="product-list">
     
            {filterCourseFunction.length === 0 ? (
                <p className="no-results">
                    Sorry, No matching Product found.
                </p>
            ) : (
                
                
                filterCourseFunction.map((product) => (
                    
                    <div className="product" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>Price: ₹{product.price}</p>
                        <div className="item-actions">
                            </div>
                        <button
                            className="add-to-cart-button"
                            onClick={() => addCourseToCartFunction(product)}
                        >
                            Add Item
                        </button>
                    </div>
                   
                ))
            )}
        </div>
        </header>

    );
}
export default ShowCourseComponent;