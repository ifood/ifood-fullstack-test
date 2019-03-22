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


@RestController
public class ClientController {

    @Autowired
    private ClientRepository repository;

    @PostMapping
    public Client add(@RequestBody Client client) {
        return repository.save(client);
    }

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Collection<Client>> findByName(@PathVariable("name") String name) {
        return ResponseEntity.ok(repository.findByNameIgnoreCaseContaining(name));
    }

    @GetMapping("/findFiltered")
    public ResponseEntity findAllFiltered(
            @QuerydslPredicate(root = Client.class, bindings = ClientRepository.class)
                    Predicate predicate,
            @PageableDefault(sort = {"name"}, page = 0, size = Integer.MAX_VALUE) Pageable pageable) {
        return ResponseEntity.ok(repository.findAll(predicate, pageable).getContent());
    }



}
