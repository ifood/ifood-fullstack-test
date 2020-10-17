package com.ifood.demo.service;

import com.ifood.demo.client.ClientService;
import com.ifood.demo.model.Client;
import com.ifood.demo.model.Order;
import com.ifood.demo.model.dto.OrderDto;
import com.ifood.demo.model.filter.OrderFilter;
import com.ifood.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private ClientService clientService;

    public Order create(OrderDto order) {
        return repository.save(order.toOrder());
    }

    public List<OrderDto> findAllByFilter(OrderFilter filter) {

        if (filter.getStartDate() == null) {
            filter.setStartDate(CreateDate("1900-01-01"));
        }
        if (filter.getEndDate() == null) {
            filter.setEndDate(CreateDate("2021-01-01"));
        }
        Collection<Order> result = repository.findByCreatedAtBetween(filter.getStartDate(), filter.getEndDate());
        Collection<Client> clients = clientService.findAll(filter.getClientName(), filter.getMail(), filter.getPhone());

        return result.stream().map(i -> new OrderDto(i,
                clients.stream()
                        .filter(b -> b.getId().equals(i.getClientId()))
                        .findFirst()
        )).filter(order -> order.getClient() != null).collect(Collectors.toList());
    }

    private Date CreateDate(String date) {
        try {
            DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return sdf.parse(date);
        } catch (ParseException ex) {
            return null;
        }
    }
}
