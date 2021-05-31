package com.ifood.demo.client.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
public class Client {

    @Id
    private UUID id;
    private final String name;
    private final String email;
    private final String phone;

    protected Client() {
        this(null, null, null);
    }
}
