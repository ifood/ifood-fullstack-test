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
import java.util.concurrent.TimeUnit;

@Component
public class DataLoader implements ApplicationRunner {

    private OrderRepository repository;

    @Autowired
    public DataLoader(OrderRepository repository) {
        this.repository = repository;
    }

    public void run(ApplicationArguments args) {
        List<Order.Item> items = new ArrayList<>();
        for(int x = 0; x<10; x++) {
            for(int y = 0; y<10; y++) {
                Order order = new Order(UUID.fromString("400c9c61-7930-4846-8b20-17655ca9e7ab"), UUID.randomUUID(), new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(x*7)), new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(x*7)), items);
                repository.save(order);
            }
        }

        for(int x = 0; x<10; x++) {
            for(int y = 0; y<10; y++) {
                Order order = new Order(UUID.fromString("400c9c61-7930-4846-8b20-17655ca9e7ab"), UUID.randomUUID(), new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(x*7)), new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(x*7)), items);
                repository.save(order);
            }
        }

        for(int x = 0; x<10; x++) {
            for(int y = 0; y<10; y++) {
                Order order = new Order(UUID.fromString("ff86425b-00f7-4cc6-b050-ba48874ed314"), UUID.randomUUID(), new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(x*7)), new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(x*7)), items);
                repository.save(order);
            }
        }

    }
}