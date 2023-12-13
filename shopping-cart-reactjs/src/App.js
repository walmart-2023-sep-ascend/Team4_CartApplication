import React, { useState,useEffect } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';
import TotalCartComponent from './components/TotalCartComponent';
//import EmptyPageComponent from './components/EmptyPageComponent';
import cartService from './services/cartService';
//import { useLocation } from 'react-router-dom'; 

const date = new Date();


//import TotalCartComponent from './components/TotalCartComponent';



 
function App() {

 // const location = useLocation();
 // const queryParams = new URLSearchParams(location.search);
 // const userId = queryParams.get('id');
 // const userEmail = queryParams.get('email');

   const userId = 55;
    const userEmail = 'adam@gmail.com';
  var itemQty;
  const ADD_SERVICE_URL="http://localhost:8080/cart/addToCart";

    const [courses] = useState([
        { id: 1,
          name: 'T-shirt',
          price: 499,
          qty:0,
          discount: 5,
          offers: <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 5% off for this product </span>,

          image:
'https://i5.walmartimages.com/seo/Gildan-Adult-Short-Sleeve-Crew-T-Shirt-for-Crafting-White-Adult-Sizes-S-3XL-Soft-Cotton-Classic-Fit-1-Pack-Blank-Tee_d9123c59-1fe3-4559-a465-6a98221b45b8.469d727d0e9de18ee2134dec29687d0f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF'
          
},
        { id: 2,
          name: 'Bag',
          price: 699,
          qty:0,
          discount: 9.9,
          offers: <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 9.9% off for this product </span>,
          image:
'https://i5.walmartimages.com/asr/5096b486-7ff4-40a1-bea8-9a8628a98064.de58f66b864bb20049dc115ed046881a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF'
        },
        { id: 3,
          name: 'Hoodie',
          price: 799,
          qty:0,
          discount: 10,
          offers: <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 10% off for this product </span>,
          image:
'https://i5.walmartimages.com/seo/Oxodoi-Deals-Clearance-Hoodies-for-Men-Mens-Hoodies-Hooded-Sweater-Printing-Pullover-Blouse-Men-s-Fashion-Hoodies-Sweatshirts_e399ca58-e428-4d43-b420-746914c60d2b.6ddb7dc1205a5479e2fd92d4203a66df.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'
        },
        { id: 4,
            name: 'Bike',
            price: 15000,
            qty:0,
            discount: 11,
            offers: <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 11% off for this product </span>,
            image:
  'https://i5.walmartimages.com/seo/MOPHOTO-7-Speed-27-5-Adult-Mountain-Tricycle-Exercise-Men-s-Women-s-Bicycle-3-Wheel-Cruiser-Bike_7440d07d-8fbe-47f7-9b93-97951656d3a8.b21a0a7044df3f88e31c276d24527d11.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF'
          },
          { id: 5,
            name: 'Watch',
            price: 1200,
            qty:0,
            discount: 20,
            offers: <span><img src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" width="18" height="18" class="_3HLfAg"></img> 20% off for this product </span>,
            image:
  'https://i5.walmartimages.com/seo/Apple-Watch-Series-9-GPS-Cellular-41mm-Midnight-Aluminum-Case-with-Midnight-Sport-Band-M-L_c21b6028-acd1-4040-8388-98ae5bec8027.ae88dd0027f97ad3039ec4827ef9d66f.jpeg?odnHeight=96&amp;odnWidth=96&amp;odnBg=FFFFFF 1x, https://i5.walmartimages.com/seo/Apple-Watch-Series-9-GPS-Cellular-41mm-Midnight-Aluminum-Case-with-Midnight-Sport-Band-M-L_c21b6028-acd1-4040-8388-98ae5bec8027.ae88dd0027f97ad3039ec4827ef9d66f.jpeg?odnHeight=144&amp;odnWidth=144&amp;odnBg=FFFFFF 2x'
          }
    ]);
    
    const [cartCourses, setCartCourses] = useState([]);
    const [searchCourse, setSearchCourse] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [items, setItems] = useState([]);
    //Add items to cart
    const [cart, setCart] = useState([0]);
    const [aItem, setCartItem] = useState([])
    const [itemList, setItemList] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [promo, setPromo] = useState([])

    const getCart =(userId)=>{
      cartService.getCart(userId).then((response) => {
          setCart(response.data)
          setItemList(response.data.products)
          fetchCartFunction(response.data.products)
      });
    };
    
    const getUserId =()=>{
      cartService.getUserId().then((response) => {
          setUserInfo(response.data)
          //userInfo=response.data.userId;
        //  const cookies = document.cookie
          console.log("user Response ->"+JSON.stringify(response.data))
        //  console.log("userInfo = "+response.data.userId)
          
      });

     
      
     // getUserProfile();
    };

  /*  const getUserProfile=()=>{
      cartService.getUserProfile().then((response) => {
        setUserInfo(response.data)
        //const cookies = document.cookie
        console.log("user Response ->"+JSON.stringify(response.data))
       // console.log("cookie :"+cookies)
        
    });
    console.log("userInfo ->-> "+userInfo.id)
    }; */

    useEffect(() => {
    console.log('userId:', userId);
    console.log('param2:', userEmail);

     // getUserId();
     // console.log("user id -"+userInfo.userId)
      if(userId!==undefined)
         getCart(userId)
    }, [userId, userEmail])

    const addItem =(course,quantity) =>{
      const cartPrice=totalAmountCalculationFunction();
     
      cartService.addItems(course,quantity,userId,cartPrice).then((response) => {
          setCartItem(response.data)

      });
    };
    

    const fetchCartFunction = (userCartItems) => {
      const id = 'id';
      const commonItems = courses.filter(item1 =>
        userCartItems.some(item2 => item2[id] === item1[id])
      ); 

      const updatedCommonItems = commonItems.map(item1 => {
        const correspondingItem2 = userCartItems.find(item2 => item2.id === item1.id);
        return {
          ...item1,
          qty: correspondingItem2 ? correspondingItem2.quantity : 0,
        };
      });
      
      const buildUserCartArr = updatedCommonItems.map(item => ({ product: { ...item },quantity:item.qty }));
      setCartCourses(buildUserCartArr)
  };
    const addCourseToCartFunction = (course) => {
          const alreadyCourses = cartCourses
                                .find(item => item.product.id === course.id);
        if (alreadyCourses) {
          
            const latestCartUpdate = cartCourses.map(item =>
                item.product.id === course.id ? 
                {
                ...item, quantity: item.quantity + 1,  
              }
                : item,
            );  
            {
              addItem(course,alreadyCourses.quantity)
            } ;
            //console.log("alreadyCourses-->"+JSON.stringify(alreadyCourses))
            setCartCourses(latestCartUpdate);
          
            
        } else {
            setCartCourses([...cartCourses, {product: course, quantity: 1}]);
        }
    };


    const saveForLaterFunction = (Course) => {

        const updatedCart = cartCourses.filter(item => item.product.id !== Course.id);
        const removeItemfromCart = cartCourses.filter(item => item.product.id == Course.id); 
        const productId = removeItemfromCart.map(item => item.product.id)[0];  

        setWishlist(updatedCart);
        console.log("productId"+productId)
        cartService.movetoWishList(userId,userEmail,productId).then((response) => {
        console.log("after moveing  item to wishlist "+JSON.stringify(response.data));
         
      });

      };

      const removeFromCartFunction = (product) => {
        const updatedCart = items
                             .filter(item => item.product.id !== product.id);
        setItems(updatedCart);
      };


      const deleteCourseFromCartFunction = (Course) => {
      
      const updatedCart = cartCourses
                          .filter(item => item.product.id !== Course.id);

      const removeItemfromCart = cartCourses
                          .filter(item => item.product.id == Course.id); 
      const productId = removeItemfromCart.map(item => item.product.id)[0];                                 
      setCartCourses(updatedCart);

      cartService.removeItem(userId,cart.cartId,productId).then((response) => {
       
        console.log("after remove item"+JSON.stringify(response.data));
       
    });

  };

  const totalAmountCalculationFunction = () => {
    return cartCourses
           .reduce((total, item) =>
                       total + Math.round(item.product.price * (1 - item.product.discount/100 )) * item.quantity, 0);
};

    const totalAmountdiscountFunction = () => {
      return cartCourses
             .reduce((total, item) =>
                         total + item.product.discount * item.quantity, 0);
  };
 
    const courseSearchUserFunction = (event) => {
     setSearchCourse(event.target.value);
  };
 
    const filterCourseFunction = courses.filter((course) =>
      course.name.toLowerCase().includes(searchCourse.toLowerCase())
    );

    

  
 
    return (
            <div className="App">
            
                <SearchComponent searchCourse={searchCourse}
                             courseSearchUserFunction=
                                 {courseSearchUserFunction} 
                />


                 <main className="App-main">
                <TotalCartComponent
                    courses={courses}
                    cartCourses={cartCourses}
                    totalAmountCalculationFunction={
                      totalAmountCalculationFunction
                  }
                    addCourseToCartFunction={addCourseToCartFunction}
                    deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                    setCartCourses={setCartCourses}
                    totalAmountdiscountFunction={totalAmountdiscountFunction}
                  
                    
                />
            </main>
            
            <main className="App-main">
                <UserCartComponent
                    
                    cartCourses={cartCourses}
                    deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                    saveForLaterFunction={saveForLaterFunction}
                    //SaveToCartFunction={SaveToCartFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                    removeFromCartFunction={removeFromCartFunction}
                    totalAmountCalculationFunction={
                        totalAmountCalculationFunction
                    }
                    getCart={setCart}
                    setCartCourses={setCartCourses}
                    totalAmountdiscountFunction={totalAmountdiscountFunction}
                   
                  
                />
                
                
                  
                
                
                </main>
            

                <main className="App-main">
                <ShowCourseComponent
                    courses={courses}
                    filterCourseFunction={filterCourseFunction}
                    addCourseToCartFunction={addCourseToCartFunction}
                    deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                    setCartCourses={setCartCourses}
                  
                    
                />
</main>



                



            </div>
        
    );
}
 
export default App;