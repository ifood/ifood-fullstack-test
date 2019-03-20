package com.ifood.demo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ifood.demo.Client.ClientsClient;
import com.ifood.demo.model.Client;
import com.ifood.demo.model.Order;
import com.ifood.demo.model.OrderDetail;
import com.ifood.demo.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderDetailService {
    @Autowired
    OrderRepository repository;
    @Autowired
    ClientsClient clientsClient;
    @Autowired
    ObjectMapper mapper;

    public Iterable<Order> findAll() {
        return repository.findAll();
    }

    public List<OrderDetail> findAllOrdersBetweenDate(Date start, Date end) {
        Collection<Order> orders = repository.findByCreatedAtBetween(start, end);
        List<OrderDetail> responseNode = new ArrayList<>();
        for (Order order : orders) {
            Optional<Client> client = clientsClient.findById(order.getClientId());

            if (client.isPresent()) {
                OrderDetail orderDetail = new OrderDetail(order.getId(),
                        client.get(),
                        order.getCreatedAt(),
                        order.getItems());
                responseNode.add(orderDetail);
            }
        }

        return responseNode;
    }
}
