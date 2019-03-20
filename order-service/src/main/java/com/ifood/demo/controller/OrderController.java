package com.ifood.demo.controller;

import com.ifood.demo.model.OrderDetail;
import com.ifood.demo.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;


@RestController
public class OrderController {

    @Autowired
    private OrderDetailService service;

    @GetMapping("/{start}/{end}")
    public ResponseEntity<List<OrderDetail>> findOrdersBetweenDate(@PathVariable("start")Date start, @PathVariable("end")Date end) {
        return ResponseEntity.ok(service.findAllOrdersBetweenDate(start,end));
    }

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(service.findAll());
    }
}
