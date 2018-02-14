package com.ifood.demo;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ifood.demo.order.OrderEventHandler;

@SpringBootApplication
@EnableRabbit
@EnableMongoRepositories("com.ifood.demo")
@EnableDiscoveryClient
public class OrderApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderApplication.class, args);
	}
	
    @Bean
    OrderEventHandler orderEventHandler() {
        return new OrderEventHandler();
    }

    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    final static String queueName = "order-queue";

    @Bean
    Queue queue() {
        return new Queue(queueName, true);
    }

    @Bean
    public static DirectExchange exchange() {
        return new DirectExchange("order-exchange");
    }

    @Bean
    Binding binding(Queue queue, DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(queueName);
    }
}
