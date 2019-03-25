package com.ifood.demo;

import com.ifood.demo.model.Client;
import com.ifood.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    private ClientRepository repository;

    @Autowired
    public DataLoader(ClientRepository repository) {
        this.repository = repository;
    }

    public void run(ApplicationArguments args) {
        repository.save(new Client("David Bowye", "david@music.com", "+5527222354897"));
        repository.save(new Client("Leroy Jenkins", "lejenkins@gmail.com", "+5581999465878"));
        repository.save(new Client("Enzo Rodrigues", "enzinho_01@hotmail.com", "+55819999990"));
    }
}