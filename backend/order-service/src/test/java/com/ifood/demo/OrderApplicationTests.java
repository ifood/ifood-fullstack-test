package com.ifood.demo;

import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

import com.ifood.demo.model.Order;
import com.ifood.demo.repository.OrderRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class OrderApplicationTests {

    @Autowired
	OrderRepository orderRepository;

    @Test
    public void orderTest() {

        orderRepository.deleteAll();

        orderRepository.save(new Order(UUID.randomUUID(), UUID.randomUUID(), new Date(), null,
                Arrays.asList(
                        new Order.Item("Item 1", 1, 3.39),
                        new Order.Item("Item 2", 3, 1.5),
                        new Order.Item("Item 3", 1, 4.0))
        ));
        orderRepository.save(new Order(UUID.randomUUID(), UUID.randomUUID(), new Date(), null,
                Arrays.asList(
                        new Order.Item("Item A", 2, 5.5),
                        new Order.Item("Item B", 2, 2.0))
        ));

        for (Order order : orderRepository.findAll()) {
            log.info("Found Order {}", order.toString());
        }
    }
}