package com.ifood.demo.audit;

import com.ifood.demo.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RepositoryEventHandler(Order.class)
public class OrderEventHandler {

	private static final Logger LOG = LoggerFactory.getLogger(Order.class);

	@HandleAfterCreate
	public void handleOrderCreate(Order c) {
		LOG.info("handleOrderCreate: {}", c.getId());
	}

	@HandleAfterSave
	public void handleOrderSave(Order c) {
		LOG.info("handleOrderSave: {}", c.getId());
	}

	@HandleAfterDelete
	public void handleOrderDelete(Order c) {
		LOG.info("handleOrderDelete: {}", c.getId());
	}
}
