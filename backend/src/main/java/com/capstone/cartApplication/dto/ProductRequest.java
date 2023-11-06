package com.capstone.cartApplication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest extends BaseRequest {


	private Integer id;

	/*
	 * private String title; private String purchasable;
	 */
	private Integer quantity;
	private Integer orderLimit;
	private String inventoryStatus;
	private Integer availableQty;


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getOrderLimit() 
	{ return orderLimit; }

	public void setOrderLimit(Integer orderLimit)
	{ this.orderLimit = orderLimit; } 
	
	public String getInventoryStatus()
	{ return inventoryStatus; } 
	
	public void setInventoryStatus(String inventoryStatus)
	{ this.inventoryStatus =inventoryStatus; } 
	
	public Integer getAvailableQty() 
	{ 
		return availableQty; }
	
	
	public void setAvailableQty(Integer availableQty) { this.availableQty =
			availableQty; }



}
