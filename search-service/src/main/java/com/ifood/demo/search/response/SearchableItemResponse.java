package com.ifood.demo.search.response;

import com.ifood.demo.search.SearchableItem;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SearchableItemResponse {

	private String description;
	private Integer quantity;
	private Double price;

	public SearchableItemResponse(SearchableItem item){
        this.description = item.getDescription();
        this.price = item.getPrice();
        this.quantity = item.getQuantity();
    }
}
