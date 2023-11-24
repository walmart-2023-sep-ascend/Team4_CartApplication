import axios from "axios";

const CART_SERVICE_URL="http://localhost:8080/cart/fetchCartDetails/user/1";
const ADD_SERVICE_URL="http://localhost:8080/cart/addToCart";
const date = new Date();
class CartService{
    getCart(){
        return axios.get(CART_SERVICE_URL);
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