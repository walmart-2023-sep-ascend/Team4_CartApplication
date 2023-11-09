package com.capstone.cartApplication.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.cartApplication.controller.CartController;
import com.capstone.cartApplication.convert.CartRequestToCart;
import com.capstone.cartApplication.convert.ProductRequestToProduct;
import com.capstone.cartApplication.dto.CartRequest;
import com.capstone.cartApplication.dto.CartToWishRequest;
import com.capstone.cartApplication.model.Cart;
import com.capstone.cartApplication.model.Products;
import com.capstone.cartApplication.repository.CartRepository;
import com.capstone.cartApplication.repository.ProductRepository;
import com.capstone.cartApplication.utility.ProductException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class CartServiceImpl extends Exception   implements CartService {

	private CartRepository cartRepository;
	private CartRequestToCart cartRequestToCart;
	private ProductRepository productRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(CartController.class);
	
	@Autowired
	private MessageService messageService;

	@Autowired
	public CartServiceImpl(CartRepository cartRepository, CartRequestToCart cartRequestToCart,ProductRepository productRepository) {
		this.cartRepository = cartRepository;
		this.cartRequestToCart = cartRequestToCart;
		this.productRepository=productRepository;

	}


	@Override
	public Cart saveOrUpdate(CartRequest cartRequest) throws Exception {
		Cart c = null;
		try {
			c =cartRepository.findCartByUserId(cartRequest.getUserId());
		}catch(Exception e) {
			logger.error("Exception occered inside  cart saveOrUpdate process "+e);
		}

		if(c!=null && c.get_id()!=null) { // Update Cart 
			List<Products> dbProductList = c.getProducts();
			List<Products> reqProdList = cartRequest.getProducts();

			for (Products reqProduct : reqProdList)
			{
				for (Products dbProduct : dbProductList)
				{
					logger.info("db product "+ dbProduct.getId());
					boolean  isItemAvailable =isProductAvailable(reqProduct);	
					logger.info("Is Product is available "+ isItemAvailable);
					if( isItemAvailable) {
						if (dbProduct.getId().equals(reqProduct.getId()))
						{
							dbProduct.setQuantity(reqProduct.getQuantity());
							dbProductList.add(dbProduct);
							break;
						}else {
							//System.out.println("creating new product  ---->"+dbProduct.getId());
							Products p = new Products();
							p.setId(reqProduct.getId());
							p.setQuantity(reqProduct.getQuantity());
							dbProductList.add(p);
							break;
						}
					}else {
						throw new ProductException("Product or Quantity is not available ");
					}
				}
			}
			c.setProduct(dbProductList);

			return cartRepository.save(c);
		}else { // Create Cart
			cartRequest.setId(cartRepository.max()+1); // fetch the max count and insert into cart
			return cartRepository.save(cartRequestToCart.convert(cartRequest));
		}

	}

	@Override
	public Cart findCartByUserId(int  userID) throws ProductException {
		logger.info("Inside findCartByUserId");
			if(cartRepository.findCartByUserId(userID)==null)
				throw new ProductException("User Details not available in cart table ");
			else
				return cartRepository.findCartByUserId(userID);
				
	}

	@Override
	public List<Cart> findAllCarts() {
		return cartRepository.findAll();
	}


	public boolean isProductAvailable(Products reqProduct) {
		boolean productAvaliablity = false;

		Products products = productRepository.findItemById(reqProduct.getId());
		logger.info("req id : "+reqProduct.getId());
		logger.info("req qty ->: "+reqProduct.getQuantity());
		if(products!=null && products.getId()!=null) {

			logger.info("db qty "+ products.getAvailableQty());
			if( products.getAvailableQty() >=reqProduct.getQuantity()) 
			{

				productAvaliablity=true;
			}
		}
		logger.info("productAvaliablity : "+productAvaliablity);

		return productAvaliablity;
	}

	@Override
	public Cart removeProductFromCart(Cart cart,Integer prodId) {
		logger.info("-- Inside removeProductFromCart ---");
		List<Products> listProduct=cart.getProducts();
		for(Products p:listProduct) {
			logger.info("--productId ---"+p.getId());
			logger.info("--Quantity ---"+p.getQuantity());
			logger.info("--Before Removing ---"+listProduct);

			if(p.getId() == prodId) {
				logger.info("-- Removing ProductId ---"+p.getId()+"  :  "+prodId);
				listProduct.remove(p);
				logger.info("--After Removing ---"+listProduct);
			}
			cart.setProduct(listProduct);
		}
		return cartRepository.save(cart);
	}
	
	/*
	 * @Override public Cart findCartByCartId(CartToWishRequest cartToWishRequest) {
	 * System.out.println("-- Inside findCartByCartId ---"); return
	 * cartRepository.findById(cartToWishRequest.getCartID()); }
	 */



}
