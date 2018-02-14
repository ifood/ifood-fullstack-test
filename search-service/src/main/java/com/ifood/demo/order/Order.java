package com.ifood.demo.order;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

@Data
@RequiredArgsConstructor
public class Order {
	
	private @Id UUID id;
	private UUID clientId;
	private UUID restaurantId;
	private Date createdAt;
	private Date confirmedAt;
	private ArrayList<Item> items;

    public Order(UUID id, UUID clientId, UUID restaurantId, Date createdAt, Date confirmedAt){
    	this.id = id;
    	this.clientId = clientId;
    	this.restaurantId = restaurantId;
    	this.createdAt = createdAt;
    	this.confirmedAt = confirmedAt;
    	this.items = new ArrayList<>();
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
