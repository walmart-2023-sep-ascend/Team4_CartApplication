package com.capstone.cartApplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class Users {

	@Id
	private String id;

	private @NonNull String username;

	private @NonNull String password;


}

