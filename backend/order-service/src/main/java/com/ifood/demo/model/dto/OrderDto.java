package com.ifood.demo.model.dto;

import com.ifood.demo.model.Client;
import com.ifood.demo.model.Order;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class OrderDto {

    public OrderDto(Order order, Optional<Client> client) {
        this.confirmedAt = order.getConfirmedAt();
        this.clientId = order.getId().toString();
        this.restaurantId = order.getRestaurantId().toString();
        this.createdAt = order.getCreatedAt();
        this.id = order.getId().toString();
        client.ifPresent(value -> this.client = value);
        this.items = order.getItems().stream().map(ItemDto::new).collect(Collectors.toList());
    }

    private Client client;
    private String clientId;
    private String id;
    private String restaurantId;
    private Date createdAt;
    private Date confirmedAt;
    private List<ItemDto> items;

    public Order toOrder() {
        Order order = new Order();
        order.setClientId(UUID.fromString(clientId));
        order.setRestaurantId(UUID.randomUUID());
        order.setCreatedAt(createdAt);
        order.setConfirmedAt(confirmedAt);
        List<Order.Item> itemsFromDto = items.stream().map(i -> i.toItem()).collect(Collectors.toList());
        order.setItems(itemsFromDto);
        return order;
    }
}
