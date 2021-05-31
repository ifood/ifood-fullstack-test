package com.ifood.demo;

import com.ifood.demo.order.OrderApplication;
import com.ifood.demo.order.document.Order;
import com.ifood.demo.order.document.Order.Item;
import com.ifood.demo.order.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(classes = OrderApplication.class)
public class OrderApplicationTests {

    @Autowired
    OrderRepository orderRepository;

    @Test
    public void orderTest() {

        orderRepository.deleteAll();

        orderRepository.save(new Order(UUID.randomUUID(), UUID.randomUUID(), LocalDateTime.now(), null,
                Arrays.asList(
                        new Item("Item 1", 1, 3.39),
                        new Item("Item 2", 3, 1.5),
                        new Item("Item 3", 1, 4.0))
        ));
        orderRepository.save(new Order(UUID.randomUUID(), UUID.randomUUID(), LocalDateTime.now(), null,
                Arrays.asList(
                        new Item("Item A", 2, 5.5),
                        new Item("Item B", 2, 2.0))
        ));

        for (Order order : orderRepository.findAll()) {
            log.info("Found Order {}", order.toString());
        }
    }

}