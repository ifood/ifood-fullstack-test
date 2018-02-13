package com.ifood.demo.client;

import java.util.concurrent.TimeUnit;

import com.ifood.demo.ClientApplication;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import org.springframework.stereotype.Component;


@Component
public class Dispatcher {

    private final RabbitTemplate rabbitTemplate;
    private final Receiver receiver;

    public Dispatcher(Receiver receiver, RabbitTemplate rabbitTemplate) {
        this.receiver = receiver;
        this.rabbitTemplate = rabbitTemplate;

    }

    public void emmitEvent(String... args) throws Exception {
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(ClientApplication.queueName, "Hello from RabbitMQ!");
        receiver.getLatch().await(10000, TimeUnit.MILLISECONDS);
    }
}

