package com.ifood.demo.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import com.ifood.demo.model.Order;

@Data
@NoArgsConstructor
public class ItemDto {
    private String description;
    private Integer quantity;
    private Double price;

    public ItemDto(Order.Item x) {
        quantity = x.getQuantity();
        price = x.getPrice();
        description = x.getDescription();
    }

    public Order.Item toItem() {
        Order.Item item = new Order.Item();
        item.setDescription(description);
        item.setPrice(price);
        item.setQuantity(quantity);
        return item;
    }
}
