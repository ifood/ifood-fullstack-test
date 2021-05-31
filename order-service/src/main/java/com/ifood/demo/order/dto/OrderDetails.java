package com.ifood.demo.order.dto;

import com.ifood.demo.order.document.Order;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Setter
@Builder
@RequiredArgsConstructor
public class OrderDetails {
    private final LocalDateTime createdAt;
    private final String name;
    private final String email;
    private final String phone;
    private final List<Order.Item> items;

    protected OrderDetails() {
        this(null, null, null, null, null);
    }
}
