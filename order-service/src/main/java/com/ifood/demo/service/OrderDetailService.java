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

    public Iterable<Order> findByCreatedAtBetweenAndClientId(Date start, Date end, UUID clientId) {
        return repository.findByCreatedAtBetweenAndClientId(start, end, clientId);
    }


    public List<OrderDetail> findAll() {
        Iterable<Order> orders = repository.findAll();;
        return populateOrdersClient(orders, null);
    }


    public List<OrderDetail> findAllOrdersBetweenDate(Date start, Date end) {
        Collection<Order> orders = repository.findByCreatedAtBetween(start, end);
        return populateOrdersClient(orders, null);
    }

    public List<OrderDetail> findBetweenDateAndClientFiltered(Date start, Date end, String name, String phone, String email) {
        Collection<Order> orders = repository.findByCreatedAtBetween(start, end);
        Collection<Client> clients = clientsClient.findAllFiltered(name, email, phone);
        return populateOrdersClient(orders, clients);
    }

    private List<OrderDetail> populateOrdersClient(Iterable<Order> orders, Collection<Client> clients) {
        List<OrderDetail> responseNode = new ArrayList<>();
        Optional<Client> client = null;
        //For each order
        for (Order order : orders) {

            if (order.getId() != client.get().getId()) {
                //If already query all filtered clients
                if(clients != null) {
                    client = clients.stream()
                            .filter(cli -> cli.getId().equals(order.getClientId()))
                            .findFirst();
                } else {
                    //Request to client microservice
                    client = clientsClient.findById(order.getClientId());
                }
            }

            if (client.isPresent()) {
                OrderDetail orderDetail = new OrderDetail(order.getId(),
                        client.get(),
                        order.getCreatedAt(),
                        order.getItems());
                responseNode.add(orderDetail);
            }
        }

        return responseNode;
    };

}
