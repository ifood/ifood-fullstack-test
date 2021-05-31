package com.ifood.demo.order.client;

import com.ifood.demo.order.dto.Client;
import feign.FeignException;
import feign.hystrix.FallbackFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;

@FeignClient(serviceId = "client-service", url = "${feign.client-service.url:http://localhost:8081}", fallbackFactory = ClientClient.ClientFallbackFactory.class)
@Component
public interface ClientClient {

    @GetMapping(path = "/v1/clients")
    Resources<Client> findAllFiltered(@RequestParam("name") String name,
                                      @RequestParam("email") String email,
                                      @RequestParam("phone") String phone);

    @Slf4j
    class ClientClientFallback implements ClientClient {
        private final Throwable cause;

        public ClientClientFallback(Throwable cause) {
            this.cause = cause;
        }

        @Override
        public Resources<Client> findAllFiltered(String name, String email, String phone) {
            log.warn("Entered client fallback with params name={}, email={}, phone={}", name, email, phone);

            if (cause instanceof FeignException) {
                FeignException feignException = (FeignException) cause;
                log.warn("ClientClient failed with status {}. Reason: {}", feignException.status(), feignException.getMessage());
            }

            return new Resources<>(Collections.emptyList());
        }
    }

    @Component
    class ClientFallbackFactory implements FallbackFactory<ClientClient> {

        @Override
        public ClientClient create(Throwable cause) {
            return new ClientClientFallback(cause);
        }
    }
}
