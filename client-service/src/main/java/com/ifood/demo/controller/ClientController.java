package com.ifood.demo.controller;

import com.ifood.demo.model.Client;
import com.ifood.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Pageable;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;


@RestController
public class ClientController {

    @Autowired
    private ClientRepository repository;

    @PostMapping
    public Client add(@RequestBody Client client) {
        return repository.save(client);
    }

    @GetMapping("v1/")
    public Collection<Client> findAllFiltered(
            @QuerydslPredicate(root = Client.class, bindings = ClientRepository.class)
                    Predicate predicate,
            @PageableDefault(sort = {"name"}, page = 0, size = Integer.MAX_VALUE) Pageable pageable) {
        return repository.findAll(predicate, pageable).getContent();
    }

    @GetMapping("v1/{id}")
    public Optional<Client> findById(@PathVariable("id") UUID id) {
        System.out.println("Aqui meu pirrai");
        return repository.findById(id);
    }



}
