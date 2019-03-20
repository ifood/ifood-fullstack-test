package com.ifood.demo.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class OrderDetail {

    private final UUID id;
    private final Client client;
    private final Date createdAt;
    private final List<Order.Item> items;


    public OrderDetail(UUID id, Client client, Date createdAt, List<Order.Item> items) {
        this.id = id;
        this.client = client;
        this.createdAt = createdAt;
        this.items = items;
    }
}
