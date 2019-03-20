package com.ifood.demo.controller;

import com.ifood.demo.model.Client;
import com.ifood.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
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

    @GetMapping("/findAll")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Collection<Client>> findByName(@PathVariable("name") String name) {
        return ResponseEntity.ok(repository.findByNameIgnoreCaseContaining(name));
    }

    @GetMapping("/{phone}")
    public ResponseEntity<Collection<Client>> findByPhone(@PathVariable("phone") String phone) {
        return ResponseEntity.ok(repository.findByPhoneIgnoreCaseContaining(phone));
    }

    @GetMapping("/{email}")
    public ResponseEntity<Collection<Client>> findByEmail(@PathVariable("email") String email) {
        return ResponseEntity.ok(repository.findByEmailIgnoreCaseContaining(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Client>> findById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(repository.findById(id));
    }

//    @GetMapping("/{name}/{phone}/{email}/{page}")
//    public Page<Client> findAllByAllCritereas(@PathVariable("name") String name,
//                                              @PathVariable("phone") String phone,
//                                              @PathVariable("email") String email,
//                                              @PathVariable("page") Pageable pageable) {
//        return repository.findAllByAllCriterias(name, phone, email, pageable);
//    }

}
