package com.capstone.cartApplication.repository;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.cartApplication.model.Cart;

import org.bson.types.ObjectId;

@Repository
public interface CartRepository extends  MongoRepository<Cart, ObjectId> {
	
	Cart findCartByUserId(Integer userId);
	
	@Aggregation(pipeline = { "{$group: { _id: '', total: {$max: $cartId }}}" })
	public Integer max();

	@Aggregation(pipeline = { "{$group: { _id: '', total: {$min: $cartId }}}" })
	public Integer min();

	//Cart findById(Integer cartID);

	
	//Cart findTopByCartByCart();

}
