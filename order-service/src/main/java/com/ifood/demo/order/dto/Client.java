package com.ifood.demo.order.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Client {

    private final String name;
    private final String email;
    private final String phone;
    private UUID id;

    protected Client() {
        this(null, null, null);
    }
}
