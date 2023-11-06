package com.capstone.cartApplication.dto;

public class CartToWishRequest {
	
	private Integer cartID;
	private Integer prodId;
	public Integer getCartID() {
		return cartID;
	}
	public void setCartID(Integer cartID) {
		this.cartID = cartID;
	}
	public Integer getProdId() {
		return prodId;
	}
	public void setProdId(Integer prodId) {
		this.prodId = prodId;
	}
}
