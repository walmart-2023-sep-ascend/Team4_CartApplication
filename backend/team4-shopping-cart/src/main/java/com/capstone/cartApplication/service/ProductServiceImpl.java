package com.capstone.cartApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.cartApplication.convert.ProductRequestToProduct;
import com.capstone.cartApplication.dto.ProductRequest;
import com.capstone.cartApplication.model.Products;
import com.capstone.cartApplication.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{


	private ProductRepository productRepository;

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository, ProductRequestToProduct productRequestToProduct) {
		this.productRepository = productRepository;
	}    

	@Override
	public Products findItemById(Integer itemId) {
		//Products prod = productRepository.findItemById(itemId);
		return productRepository.findItemById(itemId);
	}


}
