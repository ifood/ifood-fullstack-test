package com.ifood.demo.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.awt.print.Pageable;
import java.util.Optional;
import java.util.UUID;

@FeignClient(name = "client-service")
public interface ClientsClient {

    @GetMapping("/{name}/{phone}/{email}/{page}")
    public Page findAllByAllCritereas(@PathVariable("name") String name,
                                      @PathVariable("phone") String phone,
                                      @PathVariable("email") String email,
                                      @PathVariable("page") Pageable pageable);

    @GetMapping("/{id}")
    public Optional findById(@PathVariable("id") UUID id);
}
