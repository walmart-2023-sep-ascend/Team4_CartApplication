package com.capstone.cartApplication.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.cartApplication.dto.CartRequest;
import com.capstone.cartApplication.dto.CartToWishRequest;
import com.capstone.cartApplication.dto.ProductRequest;
import com.capstone.cartApplication.model.Cart;
import com.capstone.cartApplication.model.Products;
import com.capstone.cartApplication.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {
	
	private static final Logger logger = LoggerFactory.getLogger(CartController.class);

	@Autowired
	private CartService cartService;
	
	
	@Autowired
	private MessageService messageService;
	
	
	  @Autowired
	  public CartController(CartService cartService)
	  { this.cartService=cartService;
	  
	  }
	 
	@GetMapping(value = "/fetchCartDetails/user/{id}")
	private ResponseEntity getCartByCustomerId(@PathVariable(value = "id")int userId) {
		try {
			Cart cart = cartService.findCartByUserId(userId );
			return new ResponseEntity<>(cart, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Find Cart by Customer id method error {}" + e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	  @PostMapping(value = "/addToCart")
	    private ResponseEntity addToCart(@RequestBody CartRequest cartRequest) {
	        try {
	        	
	        	System.out.println(" Inside addToCart");
	        	logger.info("Inside addToCart for User Id :"+cartRequest.getUserId());
	            Cart cart = cartService.saveOrUpdate(cartRequest);
	            return new ResponseEntity<>(cart, HttpStatus.CREATED);
	        } catch (Exception e) {
	        	System.out.println("Exception :: Create Cart method error {}"+ e.getMessage());
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

	/*  @PostMapping(value= "/moveFromCartToWish")
      private ResponseEntity moveFromCartToWish(@RequestBody CartToWishRequest cartToWishRequest) {
                 
                  try {
                                System.out.println("Inside moveFromCartToWish");
               System.out.println("incoming Request ->"+cartToWishRequest.getCartID());
               System.out.println("incoming Request ->"+cartToWishRequest.getProdId());
              
               Cart cart = cartService.findCartByCartId(cartToWishRequest);
               //System.out.println("fetching from productservice"+productService.findItemById(cartToWishRequest.getProdId()));
              
               System.out.println("fetched Cart details : ->"+cart.getCartId());
               System.out.println("fetched Cart details : ->"+cart.getPromoCode());
               System.out.println("fetched Cart details : ->"+cart.getAmount());
               System.out.println("fetched Cart details : ->"+cart.getUserId());
               System.out.println("fetched Cart details : ->"+cart.getDate());
              
         //  for(Products p:cart.getProducts()) {
                                          System.out.println("--productId ---"+p.getId());
       //                                   System.out.println("--Quantity ---"+p.getQuantity());
       //                     
              
          cart=cartService.removeProductFromCart(cart,cartToWishRequest.getProdId());
               //Cart cart = cartService.saveOrUpdate(cartToWishRequest);
                                return new ResponseEntity<>(cart, HttpStatus.CREATED);
                  } catch (Exception e) {
                                System.out.println("Move From Cart To WishList method error {}"+ e.getMessage());
             return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                  }
                 
   }*/

}
