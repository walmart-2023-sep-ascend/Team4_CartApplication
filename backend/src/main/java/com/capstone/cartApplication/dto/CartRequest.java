package com.capstone.cartApplication.dto;

import java.util.Date;
import java.util.List;

import com.capstone.cartApplication.model.Products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest extends BaseRequest {

    private Integer userId;
    private List<Products> products;
	private Date date;
	private String promoCode;
	private Double amount;
    
	
	public Integer getUserId() {
		return this.userId;
	}
	public List<Products> getProducts() {
		return products;
	}
	public void setProduct(List<Products> products) {
		this.products = products;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getPromoCode() {
		return promoCode;
	}
	public void setPromoCode(String promoCode) {
		this.promoCode = promoCode;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public void setProducts(List<Products> products) {
		this.products = products;
	}
    
	
}