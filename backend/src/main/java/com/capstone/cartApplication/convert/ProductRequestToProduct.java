package com.capstone.cartApplication.convert;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.capstone.cartApplication.dto.ProductRequest;
import com.capstone.cartApplication.model.Products;

@Component
public class ProductRequestToProduct implements Converter<ProductRequest, Products> {
	
    @Override
    public Products convert(ProductRequest productRequest) {
        Products products = new Products();
        
        if (!StringUtils.isEmpty(productRequest.getId())) {
        	products.setId(productRequest.getId());
        }
        products.setQuantity(productRequest.getQuantity());
      //  products.setOrderLimit(productRequest.getOrderLimit());
       // products.setAvailableQty(productRequest.getAvailableQty());
       // products.setInventoryStatus(productRequest.getInventoryStatus());
        
        return products;
    }
    
}
