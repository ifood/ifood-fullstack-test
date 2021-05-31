package com.ifood.demo.client;

import com.ifood.demo.client.config.QuerydslConfig;
import com.ifood.demo.client.repository.ClientEventHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.ifood.demo")
@EnableEurekaClient
@Import({QuerydslConfig.class})
public class ClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientApplication.class, args);
    }

    @Bean
    ClientEventHandler clientEventHandler() {
        return new ClientEventHandler();
    }
}
