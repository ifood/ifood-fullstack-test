package com.ifood.demo.client;

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
