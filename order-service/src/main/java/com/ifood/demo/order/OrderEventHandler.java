package com.ifood.demo.order;

import com.ifood.demo.OrderApplication;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RepositoryEventHandler(Order.class)
public class OrderEventHandler {

	@Autowired
	private RabbitTemplate rabbitTemplate;

	@HandleAfterCreate
	public void handleOrderCreate(Order c) {
		log.info("handleOrderCreate: {}", c.getId());
		rabbitTemplate.convertAndSend(OrderApplication.exchange().getName(), "order-queue", c);
		log.info("Sent: {}", c.toString());
	}

	@HandleAfterSave
	public void handleOrderSave(Order c) {
		log.info("handleOrderSave: {}", c.getId());
	}

	@HandleAfterDelete
	public void handleOrderDelete(Order c) {
		log.info("handleOrderDelete: {}", c.getId());
	}
}
