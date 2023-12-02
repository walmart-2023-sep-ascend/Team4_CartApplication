import axios from "axios";

const CART_SERVICE_URL="http://localhost:8080/cart/fetchCartDetails/user/";
const ADD_SERVICE_URL="http://localhost:8080/cart/addToCart";
const LOGIN_SERVICE_URL="http://localhost:8181/api/auth/signin"  //team 1 login service URL
const PROMO_SERVICE_URL="http://localhost:8080/promotions/active"
const CART_URL="http://localhost:3000/"

const date = new Date();
class CartService{
    getCart = (userId) =>{
        const fetchUserCart =CART_SERVICE_URL+userId;
        console.log("fetchUserCart ->"+fetchUserCart)
        return axios.get(fetchUserCart);
    }

    getUserId(){
        return axios.get(LOGIN_SERVICE_URL);
    }

    getPromotions()
    {
        console.log("PROMO_SERVICE_URL->"+PROMO_SERVICE_URL)
        return axios.get(PROMO_SERVICE_URL); 
    }
    addItems(course,quantity){
        console.log("product",course.id);
        console.log("inside addItems",quantity);
        return axios({
            method: 'post',
            url: ADD_SERVICE_URL,
            headers: {}, 
            data: {
             userId:1,
             date :date,
             promoCode : "TESTCODE",
             products :[
                {
                    id:course.id,
                    quantity:quantity

                }
             ]
            }
          });

          console.log("inside cartservice")
    }

}




export default new CartService();