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
	
	private @Id UUID id = UUID.randomUUID();

	public Order(UUID randomUUID, UUID randomUUID1, Date date, Object o, List<Item> asList) {
	}

	public UUID getId() {
		return this.id;
	}

	private  UUID clientId;
	private  UUID restaurantId;
	private  Date createdAt;
	private  Date confirmedAt;
	private  List<Item> items;

	public UUID getClientId() {
		return clientId;
	}

	public void setClientId(UUID clientId) {
		this.clientId = clientId;
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(UUID restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getConfirmedAt() {
		return confirmedAt;
	}

	public void setConfirmedAt(Date confirmedAt) {
		this.confirmedAt = confirmedAt;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	@Data
	@RequiredArgsConstructor
	public static class Item {

		private  String description;
		private  Integer quantity;
		private  Double price;


		public Item(String description, int quantity, double price) {
			this.description = description;
			this.quantity = quantity;
			this.price = price;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public Integer getQuantity() {
			return quantity;
		}

		public void setQuantity(Integer quantity) {
			this.quantity = quantity;
		}

		public Double getPrice() {
			return price;
		}

		public void setPrice(Double price) {
			this.price = price;
		}
	}
}
