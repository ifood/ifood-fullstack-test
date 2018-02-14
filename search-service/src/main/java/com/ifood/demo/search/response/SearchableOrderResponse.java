package com.ifood.demo.search.response;

import com.ifood.demo.search.SearchableOrder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class SearchableOrderResponse {

	private @Id UUID id;
	private String clientName;
	private String clientEmail;
	private String clientPhone;
	private Date createdAt;
	private Double totalValue;

    public SearchableOrderResponse(SearchableOrder order){
    	this.id = order.getId();
    	this.clientName = order.getClientName();
    	this.clientEmail = order.getClientEmail();
    	this.clientPhone = order.getClientPhone();
    	this.createdAt = order.getCreatedAt();
    	this.totalValue = order.getTotalValue();
	}
}
