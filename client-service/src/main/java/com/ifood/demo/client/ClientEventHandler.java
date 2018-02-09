package com.ifood.demo.client;

import com.ifood.demo.ClientApplication;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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

	@Autowired
	private RabbitTemplate rabbitTemplate;

	@HandleAfterCreate
	public void handleClientCreate(Client c) {

		String routingKey = "customer.created";
		String message = "customer created";

		rabbitTemplate.convertAndSend(ClientApplication.exchange().getName(), routingKey, c.toString());

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
