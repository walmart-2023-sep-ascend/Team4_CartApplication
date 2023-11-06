package com.capstone.cartApplication.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.cartApplication.dto.CartRequest;
import com.capstone.cartApplication.dto.ProductRequest;
import com.capstone.cartApplication.model.Products;
import com.capstone.cartApplication.service.MessageService;
import com.capstone.cartApplication.service.ProductService;


@RestController
@RequestMapping("/item")
public class ProductController {
	private static final Logger logger = LoggerFactory.getLogger(CartController.class);
	
	@Autowired
	private MessageService messageService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	public ProductController(ProductService productService) {
		this.productService=productService;
	}
	
	
	   @GetMapping(value = "/fetchItemId/{id}")
	    private ResponseEntity fetchItem(@PathVariable(value = "id")int itemId) {
		   
	        try {
	            Products products = productService.findItemById(itemId);
	            return new ResponseEntity<>(products, HttpStatus.OK);
	        } catch (Exception e) {
	            logger.error("Find Items method error:"+e.getMessage());
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

}
