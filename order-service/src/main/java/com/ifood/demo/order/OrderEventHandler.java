package com.ifood.demo.order;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RepositoryEventHandler(Order.class)
public class OrderEventHandler {

	private final EventDispatcher eventDispatcher;
	private final Gson gson;

	@Autowired
	public OrderEventHandler(EventDispatcher eventDispatcher, Gson gson) {
		this.eventDispatcher = eventDispatcher;
		this.gson = gson;

	}

	@HandleAfterCreate
	public void handleOrderCreate(Order c) throws Exception {
		log.info("handleOrderCreate: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "order.created", gson.toJson(c) ));
	}

	@HandleAfterSave
	public void handleOrderSave(Order c) throws Exception {
		log.info("handleOrderSave: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "order.updated", gson.toJson(c) ));
	}

	@HandleAfterDelete
	public void handleOrderDelete(Order c) throws Exception {
		log.info("handleOrderDelete: {}", c.getId());
		eventDispatcher.emmitEvent(new Event( "order.deleted", gson.toJson(c) ));
	}
}
