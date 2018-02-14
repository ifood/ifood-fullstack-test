package com.ifood.demo.client;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@RestResource(exported = false)
public interface ClientRepository extends CrudRepository<Client, UUID> { }