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
        repository.save(new Client("Luis", "email1", "phone1"));
        repository.save(new Client("nome3", "email2", "phone1"));
        repository.save(new Client("nome2", "email2", "phone1"));
        repository.save(new Client("nome4", "email2", "phone1"));
    }
}