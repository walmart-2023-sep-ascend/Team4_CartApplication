package com.capstone.cartApplication.service;

import com.capstone.cartApplication.dto.ProductRequest;
import com.capstone.cartApplication.model.Products;

public interface ProductService {

    Products findItemById(Integer itemId);

}
