package com.ifood.demo;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.ifood.demo.client.ClientEventHandler;

@SpringBootApplication
@EnableRabbit
@EnableJpaRepositories("com.ifood.demo")
public class ClientApplication {

    final static String queueName = "client-queue";

    @Bean
    Queue queue() {
        return new Queue(queueName, false);
    }

    @Bean
    public static TopicExchange exchange() {
        return new TopicExchange("event-exchange");
    }

    @Bean
    Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(queueName);
    }


    public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
	}


    @Bean
    ClientEventHandler clientEventHandler() {
        return new ClientEventHandler();
    }

}
