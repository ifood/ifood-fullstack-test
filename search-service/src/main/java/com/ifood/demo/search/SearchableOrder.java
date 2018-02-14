package com.ifood.demo.search;

import com.ifood.demo.order.Order;
import com.querydsl.core.annotations.QueryEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@QueryEntity
@Document
public class SearchableOrder {

	private @Id UUID id;
	private UUID clientId;
	private String clientName;
	private String clientEmail;
	private String clientPhone;
	private UUID restaurantId;
	private Date createdAt;
	private Date confirmedAt;
    private Double totalValue;

    public SearchableOrder(Order order){
    	this(order.getId(), order.getClientId(), order.getRestaurantId(), order.getCreatedAt(), order.getConfirmedAt());
	}

    public SearchableOrder(UUID id, UUID clientId, UUID restaurantId, Date createdAt, Date confirmedAt){
    	this.id = id;
    	this.clientId = clientId;
    	this.restaurantId = restaurantId;
    	this.createdAt = createdAt;
    	this.confirmedAt = confirmedAt;
	}
}
