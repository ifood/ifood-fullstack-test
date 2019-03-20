package com.ifood.demo.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Document
@RequiredArgsConstructor
public class Order {	
	
	private final @Id UUID id = UUID.randomUUID();
	private final UUID clientId;
	private final UUID restaurantId;
	private final Date createdAt;
	private final Date confirmedAt;	
	private final List<Item> items;


	@Data
	@RequiredArgsConstructor
	public static class Item {

		private final String description;
		private final Integer quantity;		
		private final Double price;
	}

	public UUID getId() {
		return this.id;
	}

	public UUID getClientId() {
		return clientId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public List<Item> getItems() {
		return items;
	}
}
