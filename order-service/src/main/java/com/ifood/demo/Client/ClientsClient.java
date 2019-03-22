package com.ifood.demo.Client;

import com.ifood.demo.model.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@FeignClient(name = "client-service")
public interface ClientsClient {

    @GetMapping("/{id}")
    public Optional<Client> findById(@PathVariable("id") UUID id);

    @GetMapping(path = "/")
    public Collection<Client> findAllFiltered(@RequestParam("name") String name,
                                      @RequestParam("email") String email,
                                      @RequestParam("phone") String phone);
}
