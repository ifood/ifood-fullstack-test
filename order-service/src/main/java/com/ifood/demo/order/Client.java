package com.ifood.demo.order;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "client-service")
public interface Client {
    
}
