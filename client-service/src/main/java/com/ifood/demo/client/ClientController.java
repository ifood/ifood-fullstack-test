package com.ifood.demo.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;


@RestController
public class ClientController {

    @Autowired
    ClientRepository repository;

    @PostMapping
    public Client add(@RequestBody Client client) {
        return repository.save(client);
    }

    @GetMapping("/{name}")
    public Collection<Client> findByName(@PathVariable("name") String name) {
        return repository.findByNameIgnoreCaseContaining(name);
    }

    @GetMapping("/{phone}")
    public Collection<Client> findByPhone(@PathVariable("phone") String phone) {
        return repository.findByPhoneIgnoreCaseContaining(phone);
    }

    @GetMapping("/{email}")
    public Collection<Client> findByEmail(@PathVariable("email") String email) {
        return repository.findByEmailIgnoreCaseContaining(email);
    }

    @GetMapping("/{id}")
    public Optional<Client> findById(@PathVariable("id") UUID id) {
        return repository.findById(id);
    }

}
