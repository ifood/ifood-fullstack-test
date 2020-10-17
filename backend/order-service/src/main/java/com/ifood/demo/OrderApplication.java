package com.ifood.demo;

import com.ifood.demo.audit.OrderEventHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableFeignClients
@EnableMongoRepositories("com.ifood.demo")
public class OrderApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderApplication.class, args);
	}
	
    @Bean
    OrderEventHandler orderEventHandler() {
        return new OrderEventHandler();
    }
}
