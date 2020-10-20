package com.ifood.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Client {

    private @Id @GeneratedValue UUID id;
    private String name;
    private String email;
    private String phone;

    public Client(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public UUID getId() {
        return this.id;
    }
}