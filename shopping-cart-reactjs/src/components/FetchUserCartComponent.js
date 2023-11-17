import React, { useState, useEffect }  from 'react';
import cartService from '../services/cartService';
const FetchUserCart = () => {
const [cart, setCart] = useState([])

const getCart =()=>{
    cartService.getCart().then((response) => {
        setCart(response.data)
        console.log(response.data);
    });
};
useEffect(() => {
    getCart()
  }, [])

const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])

if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {users.map(user => (
                <li key={user.id}>
                    {user.name} 
                </li>
                ))}
            </ul>
        );
    }


    return (
        <div className="container">
            <h1 className="text-center">User Cart</h1>
            {
                <text>
    
    
                Cart id : {cart.cartId}
               User Id :  {cart.userId}
    
               {cart.products.map((item) => (
                <text>
                    item id ={item.id}
                    quantity={item.quantity}
    
                </text>
               ))}

                
                </text>
    
    
                
            }
    
    
        </div>
      )
}
export default FetchUserCart;