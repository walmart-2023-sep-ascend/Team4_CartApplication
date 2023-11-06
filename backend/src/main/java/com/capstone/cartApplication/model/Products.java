package com.capstone.cartApplication.model;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators.In;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("products")
public class Products {

	@Id
	private ObjectId _id;
	private Integer id;
	private Integer quantity;
	private Integer availableQty;
	private String inventoryStatus;
	private Integer orderLimit;
	private boolean isElegibileForPromotion;
	private float discount;





	public ObjectId get_id() {
		return _id;
	}


	public void set_id(ObjectId _id) {
		this._id = _id;
	}


	public Integer getQuantity() {
		return quantity;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}


	public Integer getAvailableQty() { return availableQty; }


	public void setAvailableQty(Integer availableQty) { this.availableQty =
			availableQty; }


	public Integer getOrderLimit() { return orderLimit; }


	public void setOrderLimit(Integer orderLimit) { this.orderLimit = orderLimit;
	}


	public String getInventoryStatus() { return inventoryStatus; }


	public void setInventoryStatus(String inventoryStatus) { this.inventoryStatus
		= inventoryStatus; }

	public boolean isElegibileForPromotion() {
		return isElegibileForPromotion;
	}


	public void setElegibileForPromotion(boolean isElegibileForPromotion) {
		this.isElegibileForPromotion = isElegibileForPromotion;
	}


	public float getDiscount() {
		return discount;
	}


	public void setDiscount(float discount) {
		this.discount = discount;
	}





}
