package com.ifood.demo.repository;

import com.ifood.demo.model.Client;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import org.slf4j.Logger;


@RepositoryEventHandler(Client.class)
public class ClientEventHandler {


	private static final Logger LOGGER = LoggerFactory.getLogger(Client.class);

	@HandleAfterCreate
	public void handleClientCreate(Client c) {
		LOGGER.info("handleClientCreate: {}", c.getId().toString());
	}
	
	@HandleAfterSave
	public void handleClientSave(Client c) {
		LOGGER.info("handleClientSave: {}", c.getId().toString());
	}
	
	@HandleAfterDelete
	public void handleClientDelete(Client c) {
		LOGGER.info("handleClientDelete: {}", c.getId().toString());
	}
}
