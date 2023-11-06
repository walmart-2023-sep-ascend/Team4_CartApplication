package com.capstone.cartApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.capstone.cartApplication.repository.CartRepository;
import com.capstone.cartApplication.repository.ProductRepository;
import com.capstone.cartApplication.service.CartService;

import jakarta.annotation.Resource;


@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
@EnableMongoRepositories(basePackageClasses = {CartRepository.class,ProductRepository.class})
public class CartApplication {

	public static void main(String[] args) {
		SpringApplication.run(CartApplication.class, args);

	}

	@Resource
	private CartRepository cartRepository;

	@Resource
	private ProductRepository productRepository;

	

}
