import axios from "axios";

const CART_SERVICE_URL="http://localhost:8080/cart/fetchCartDetails/user/";
const ADD_SERVICE_URL="http://localhost:8080/cart/addToCart";
const LOGIN_SERVICE_URL="http://localhost:8181/api/auth/signin"  //team 1 login service URL
const USER_PROFILE_URL="http://localhost:8181/api/test/profile"
const PROMO_SERVICE_URL="http://localhost:8080/promotions/active"
const REMOVE_ITEM_URL="http://localhost:8080/cart/remove"
const MOVE_TO_WISHLIST_URL="http://localhost:8080/cart/moveFromCartToWish"
const CART_URL="http://localhost:3000/"

const date = new Date();
class CartService{
    getCart = (userId) =>{
        console.log("fetchUserCart userId ->"+userId)
        const fetchUserCart =CART_SERVICE_URL+userId;
        console.log("fetchUserCart ->"+fetchUserCart)
        return axios.get(fetchUserCart);
    }

    getUserProfile(){
       // headers.set("Cookie", cookies.sessionCookie);
        return axios.get(USER_PROFILE_URL, {withCredentials: true}) ; 
    }

    getUserId(){
        try{
        return axios({
            method: 'post',
            url: LOGIN_SERVICE_URL,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                email:"arun.perumal5@gmail.com",
                password :123456,
                withCredentials: true,
            },
          });
        }catch(error){
            console.error('Error:', error);
            throw error;
        }
    }


    removeItem(uId,cId,pId){
        console.log(uId)
        console.log(pId)
        console.log(cId)
        return axios({
            method: 'delete',
            url: REMOVE_ITEM_URL,
            headers: {'Content-Type': 'application/json'}, 
            data: {
             userId:uId,
             prodId:pId,
             cartId:cId
            }
          });  
    }
    getPromotions()
    {
        console.log("PROMO_SERVICE_URL->"+PROMO_SERVICE_URL)
        return axios.get(PROMO_SERVICE_URL); 
    }
    addItems(course,quantity,uId,cartPrice){
      //  console.log("product",course.id);
      //  console.log("product",uId);
        console.log("cartPrice",cartPrice);
        return axios({
            method: 'post',
            url: ADD_SERVICE_URL,
            headers: {}, 
            data: {
             userId:uId,
             date :date,
             amount: cartPrice,
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