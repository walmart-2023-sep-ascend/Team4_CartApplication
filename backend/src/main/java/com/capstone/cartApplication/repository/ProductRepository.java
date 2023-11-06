package com.capstone.cartApplication.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.cartApplication.model.Products;

@Repository
public interface ProductRepository extends MongoRepository<Products, Object> {
    Products findItemById(Integer id);
    
    @Query("{_id: { $in: ?0 } })")
    Products fetchByProductId(Integer id);
    
}
