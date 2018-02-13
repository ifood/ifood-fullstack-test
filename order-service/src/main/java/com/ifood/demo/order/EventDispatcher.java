package com.ifood.demo.order;

import com.google.gson.Gson;
import com.ifood.demo.OrderApplication;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

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

        rabbitTemplate.convertAndSend(OrderApplication.queueName, eventPayload);

        receiver.getLatch().await(10000, TimeUnit.MILLISECONDS);

    }
}

