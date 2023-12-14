import axios from "axios";


const CART_SERVICE_URL="http://20.127.159.231:9300/cart/fetchCartDetails/user/";
const ADD_SERVICE_URL="http://20.127.159.231:9300/cart/addToCart";
const LOGIN_SERVICE_URL="http://52.142.30.237:9003/api/auth/signin"  //team 1 login service URL
const USER_PROFILE_URL="http://52.142.30.237:9003/api/test/profile"
const PROMO_SERVICE_URL="http://20.127.159.231:9300/promotions/active"
const REMOVE_ITEM_URL="http://20.127.159.231:9300/cart/remove"
const MOVE_TO_WISHLIST_URL="http://20.127.159.231:9300/cart/moveFromCartToWish"
//const CART_URL="http://20.127.159.231:9300/cart/"
const PRODUCT_SERVICE="http://20.127.159.231:9300//item/fetchItemId/"
const DISCOUNT_SERVICE_URL="http://172.203.170.91:9400/promotion/getActivePromotionsByPromocode/"
const authKey="Token="

const date = new Date();

class CartService{
 

    getCart = async(userId) =>{
        console.log("fetchUserCart userId ->"+userId)
        const fetchUserCart =CART_SERVICE_URL+userId;
        console.log("fetchUserCart ->"+fetchUserCart)
        return axios.get(fetchUserCart);
    }

    getItem = async(pId) =>{
        console.log("product id->"+pId)
        const fetchItem =PRODUCT_SERVICE+pId;
        return axios.get(fetchItem);
    }

    getUserProfile(token){
        console.log("Inside getUserProfile")
      const authToken=authKey+token;
      console.log("authToken   :"+authToken)
        return axios({
            method: 'get',
            withCredentials: true,
            url: USER_PROFILE_URL,
            headers: {
                
                'Cookie' : authToken,
                
            }
          });
    }

    movetoWishList(uId,uEmail,pId){
        try{
            return axios({
                method: 'post',
                url: MOVE_TO_WISHLIST_URL,
                headers: {
                    'Content-Type': 'application/json'
                }, 
                data: {
                    email:uEmail,
                    userId :uId,
                    prodId: pId,
                },
              });
              
            }catch(error){
                console.error('Error:', error);
                //throw error;
            }
    }
    /* Integration testing sample block */
    getUserId(){
        try{
        return axios({
            method: 'post',
            url: LOGIN_SERVICE_URL,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {
                email:"team4cart@gmail.com",
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
        //debugger;
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

    saveForLater(cId,pId,uId,eId){
        //debugger;
        console.log(uId)
        console.log(pId)
        console.log(cId)
        return axios({
            method: 'post',
            url: MOVE_TO_WISHLIST_URL,
            headers: {'Content-Type': 'application/json'}, 
            data: {
             userId:uId,
             prodId:pId,
             cartID:cId,
             email:eId
            }
          });  
    }

    getPromotions()
    {
        console.log("PROMO_SERVICE_URL->"+PROMO_SERVICE_URL)
        return axios.get(PROMO_SERVICE_URL); 
    }

    getDiscount(promo)
    {
       
        const fetchDiscount=DISCOUNT_SERVICE_URL+promo
        console.log("DISCOUNT_SERVICE_URL->"+fetchDiscount)
        return axios.get(fetchDiscount); 
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