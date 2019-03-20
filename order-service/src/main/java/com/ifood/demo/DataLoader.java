package com.ifood.demo;

import com.ifood.demo.model.Client;
import com.ifood.demo.model.Order;
import com.ifood.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Component
public class DataLoader implements ApplicationRunner {

    private OrderRepository repository;

    @Autowired
    public DataLoader(OrderRepository repository) {
        this.repository = repository;
    }

    public void run(ApplicationArguments args) {
        List<Order.Item> items = new ArrayList<>();
        Order order = new Order(UUID.fromString("b3918d33-ca16-42e4-b42c-53463e7532bb"), UUID.randomUUID(), new Date(), new Date(), items);
        repository.save(order);
    }
}