package com.ifood.demo.controller;

import com.ifood.demo.model.Order;
import com.ifood.demo.model.dto.OrderDto;
import com.ifood.demo.model.filter.OrderFilter;
import com.ifood.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/")
    public List<OrderDto> findAll(
            @RequestParam(required = false, name = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam(required = false, name = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
            @RequestParam(required = false, name = "clientName") String clientName,
            @RequestParam(required = false, name = "mail") String email,
            @RequestParam(required = false, name = "phone") String phone
    ) {
        OrderFilter filter = new OrderFilter(startDate, endDate, clientName, email, phone);
        List<OrderDto> data = orderService.findAllByFilter(filter);
        return data;
    }

    @PostMapping
    public Order create(@RequestBody OrderDto order) {
        return orderService.create(order);
    }
}
