package com.ifood.demo.client.repository;

import com.ifood.demo.client.document.Client;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

@Slf4j
@RepositoryEventHandler(Client.class)
public class ClientEventHandler {

    @HandleAfterCreate
    public void handleClientCreate(Client c) {
        log.info("handleClientCreate: {}", c.getId());
    }

    @HandleAfterSave
    public void handleClientSave(Client c) {
        log.info("handleClientSave: {}", c.getId());
    }

    @HandleAfterDelete
    public void handleClientDelete(Client c) {
        log.info("handleClientDelete: {}", c.getId());
    }
}
