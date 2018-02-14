package com.ifood.demo.order;

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
	private final UUID clientId;
	private final UUID restaurantId;
	private final Date createdAt;
	private final Date confirmedAt;
	private final List<Item> items;

	protected Order(){
		this(null, null, null, null, null);
	}

	@Data
	@RequiredArgsConstructor
	public static class Item {

		private final String description;
		private final Integer quantity;		
		private final Double price;

		protected Item(){
			this(null, null, null);
		}
	}
}
