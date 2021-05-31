package com.ifood.demo.order.repository;

import com.ifood.demo.order.document.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

public interface OrderRepository extends CrudRepository<Order, UUID> {

    @RestResource(path = "byClientId")
    Collection<Order> findByClientId(@Param("clientId") UUID clientId);

    @RestResource(path = "byRestaurantId")
    Collection<Order> findByRestaurantId(@Param("restaurantId") UUID restaurantId);

    @RestResource(path = "byDate")
    Collection<Order> findByCreatedAtBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}