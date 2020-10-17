package com.ifood.demo.controller;

import com.ifood.demo.model.Client;
import com.ifood.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.web.bind.annotation.*;
import com.querydsl.core.types.Predicate;

import java.util.Collection;

@RestController
public class ClientController {

    @Autowired
    private ClientRepository repository;

    @GetMapping("/")
    public Collection<Client> findAll(
            @QuerydslPredicate(root = Client.class, bindings = ClientRepository.class) Predicate predicate,
            Pageable pageable
    ) {
        return repository.findAll(predicate, pageable).getContent();
    }

    @PostMapping
    public Client create(@RequestBody Client client) {
        return repository.save(client);
    }
}
