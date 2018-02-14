package com.ifood.demo.search;

import com.ifood.demo.order.Order;
import com.querydsl.core.annotations.QueryEntity;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Data
@Document
@RequiredArgsConstructor
@QueryEntity
public class SearchableItem {

	private @Id UUID id = UUID.randomUUID();
	private UUID orderId;
	private String description;
	private Integer quantity;
	private Double price;

	protected SearchableItem(UUID orderId){
		this.orderId = orderId;
	}
    public SearchableItem(UUID orderId, Order.Item item){
        this.orderId = orderId;
        this.description = item.getDescription();
        this.price = item.getPrice();
        this.quantity = item.getQuantity();
    }
}
