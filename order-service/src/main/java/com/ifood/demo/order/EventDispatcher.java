package com.ifood.demo.client;

import java.util.concurrent.TimeUnit;

import com.google.gson.Gson;
import com.ifood.demo.ClientApplication;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class EventDispatcher {


    private final RabbitTemplate rabbitTemplate;
    private final Receiver receiver;
    private final Gson gson;

    @Autowired
    public EventDispatcher( RabbitTemplate rabbitTemplate, Receiver receiver, Gson gson) {

        this.rabbitTemplate = rabbitTemplate;
        this.receiver = receiver;
        this.gson = gson;

    }

    public void emmitEvent(Event event) throws Exception {

        String eventPayload = gson.toJson(event);

        log.info("dispatching event to mq....");

        rabbitTemplate.convertAndSend(ClientApplication.queueName, eventPayload);

        receiver.getLatch().await(10000, TimeUnit.MILLISECONDS);

    }
}

