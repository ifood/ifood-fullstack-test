package com.ifood.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import com.ifood.demo.client.ClientEventHandler;

@EnableDiscoveryClient
@SpringBootApplication
@EnableJpaRepositories("com.ifood.demo")
public class ClientApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
	}
	
    @Bean
    ClientEventHandler clientEventHandler() {
        return new ClientEventHandler();
    }
}
