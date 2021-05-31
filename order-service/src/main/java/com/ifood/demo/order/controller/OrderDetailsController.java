package com.ifood.demo.order.controller;

import com.ifood.demo.order.dto.OrderDetails;
import com.ifood.demo.order.dto.SearchParams;
import com.ifood.demo.order.exception.ServiceException;
import com.ifood.demo.order.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

@RepositoryRestController
@RequestMapping("/v1/orders")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/details")
    public ResponseEntity<List<OrderDetails>> getOrderDetails(@ModelAttribute SearchParams searchParams) throws ServiceException {
        List<OrderDetails> orderDetails = orderDetailsService.getOrderDetails(searchParams);
        return ResponseEntity.ok(orderDetails);
    }
}
