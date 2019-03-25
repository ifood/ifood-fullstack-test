package com.ifood.demo.controller;

import com.ifood.demo.model.OrderDetail;
import com.ifood.demo.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.UUID;


@RestController
public class OrderDetailController {

    @Autowired
    private OrderDetailService service;

    //Return an http response with all ordersDetails between date start and end
    @GetMapping("/details/")
    public ResponseEntity<List<OrderDetail>> findBetweenDateAndClientFiltered(
            @RequestParam(name = "start", defaultValue  = "1999-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd")Date start,
            @RequestParam(name = "end", defaultValue  = "2109-01-01") @DateTimeFormat(pattern = "yyyy-MM-dd")Date end,
            @RequestParam(name = "name", required = false)String name,
            @RequestParam(name = "email", required = false)String email,
            @RequestParam(name = "phone", required = false)String phone) {

        if(name == null && email == null && phone == null) {
            return ResponseEntity.ok(service.findAllOrdersBetweenDate(start,end));
        }

        return ResponseEntity.ok(service.findBetweenDateAndClientFiltered(start,end,name,phone,email));
    }

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(service.findAll());
    }

}