package com.ifood.demo;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableRabbit
@EnableJpaRepositories("com.ifood.demo")
@EnableDiscoveryClient
public class SearchApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SearchApplication.class, args);
	}

	public static final String CLIENT_QUEUE_NAME = "client-queue";
    public static final String ORDER_QUEUE_NAME = "order-queue";

	@Bean
	Queue clientQueue() {
		return new Queue(CLIENT_QUEUE_NAME, true);
	}
	@Bean
	Queue orderQueue() {
		return new Queue(ORDER_QUEUE_NAME, true);
	}

	@Bean
	public static DirectExchange clientExchange() {
		return new DirectExchange("client-exchange");
	}

    @Bean
    public static DirectExchange orderExchange() {
        return new DirectExchange("order-exchange");
    }

    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

	@Bean
	Binding clientBinding(Queue clientQueue, DirectExchange clientExchange) {
		return BindingBuilder.bind(clientQueue).to(clientExchange).with(CLIENT_QUEUE_NAME);
	}
	@Bean
	Binding orderBinding(Queue orderQueue, DirectExchange orderExchange) {
		return BindingBuilder.bind(orderQueue).to(orderExchange).with(ORDER_QUEUE_NAME);
	}
}
