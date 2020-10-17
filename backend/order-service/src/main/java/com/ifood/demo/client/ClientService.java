package com.ifood.demo.client;

import com.ifood.demo.model.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;

@FeignClient("client-service")
public interface ClientService {
    @RequestMapping("/")
    Collection<Client> findAll(@RequestParam("name") String name,
                               @RequestParam("email") String email,
                               @RequestParam("phone") String phone);
}
