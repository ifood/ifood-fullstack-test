package com.ifood.demo.client;

import com.ifood.demo.ClientApplication;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
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
		log.info("handleClientCreate: {}", c.getId());

		rabbitTemplate.convertAndSend(ClientApplication.exchange().getName(), "client-queue", c);
		log.info("Sent: {}", c.toString());
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
