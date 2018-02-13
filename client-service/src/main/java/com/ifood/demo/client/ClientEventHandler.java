package com.ifood.demo.client;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RepositoryEventHandler(Client.class)
public class ClientEventHandler {

    private final EventDispatcher eventDispatcher;
    private final Gson gson;

    @Autowired
    public ClientEventHandler(EventDispatcher eventDispatcher, Gson gson) {
        this.eventDispatcher = eventDispatcher;
        this.gson = gson;

    }

    @HandleAfterCreate
	public void handleClientCreate(Client c) throws Exception {

		log.info("handleClientCreate: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "client.created", gson.toJson(c) ));

	}
	
	@HandleAfterSave
	public void handleClientSave(Client c) throws Exception {

		log.info("handleClientSave: {}", c.getId());
        eventDispatcher.emmitEvent(new Event( "client.updated", gson.toJson(c) ));
	}
	
	@HandleAfterDelete
	public void handleClientDelete(Client c) throws Exception {

		log.info("handleClientDelete: {}", c.getId());
        eventDispatcher.emmitEvent(new Event( "client.deleted", gson.toJson(c) ));
	}
}
