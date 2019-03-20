package com.ifood.demo.repository;

import com.ifood.demo.model.Order;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RepositoryEventHandler(Order.class)
public class OrderEventHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(Order.class);

	@HandleAfterCreate
	public void handleOrderCreate(Order c) {
		LOGGER.info("handleOrderCreate: {}", c.getId().toString());
	}

	@HandleAfterSave
	public void handleOrderSave(Order c) {
		LOGGER.info("handleOrderSave: {}", c.getId().toString());
	}

	@HandleAfterDelete
	public void handleOrderDelete(Order c) {
		LOGGER.info("handleOrderDelete: {}", c.getId().toString());
	}
}
