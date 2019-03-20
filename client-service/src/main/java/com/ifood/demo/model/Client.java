package com.ifood.demo.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
public class Client {

	private @Id @GeneratedValue UUID id;
	private final String name;
	private final String email;
	private final String phone;

	public Client(String name, String email, String phone) {
		this.name = name;
		this.email = email;
		this.phone = phone;
	}

	public UUID getId() {
		return this.id;
	}
}
