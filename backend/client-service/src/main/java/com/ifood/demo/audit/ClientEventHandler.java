package com.ifood.demo.audit;

import com.ifood.demo.model.Client;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RepositoryEventHandler(Client.class)
public class ClientEventHandler {

	private static final Logger LOG = LoggerFactory.getLogger(Client.class);

	@HandleAfterCreate
	public void handleClientCreate(Client c) {
		LOG.info("handleClientCreate: {}", c.getId());
	}
	
	@HandleAfterSave
	public void handleClientSave(Client c) {
		LOG.info("handleClientSave: {}", c.getId());
	}
	
	@HandleAfterDelete
	public void handleClientDelete(Client c) {
		LOG.info("handleClientDelete: {}", c.getId());
	}
}
