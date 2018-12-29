package com.ifood.demo.order.client;

import com.ifood.demo.order.dto.Client;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@FeignClient(serviceId = "client-controller", url = "http://localhost:8081/v1/clients/")
public interface ClientClient {

  @GetMapping(path = "/")
  public Resources<Client> findAllFiltered(@RequestParam("name") String name,
      @RequestParam("email") String email, @RequestParam("phone") String phone);
}