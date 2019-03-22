package com.ifood.demo.repository;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.ifood.demo.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface OrderRepository extends CrudRepository<Order, UUID> {

	@RestResource(path = "byClientId")
	Collection<Order> findByClientId(@Param("clientId") UUID clientId);
	
	@RestResource(path = "byRestaurantId")
	Collection<Order> findByRestaurantId(@Param("restaurantId") UUID restaurantId);
	
	@RestResource(path = "byDate")
	Collection<Order> findByCreatedAtBetween(@Param("start") Date start, @Param("end") Date end);

	@RestResource(path = "byDateAndByClientId")
	Collection<Order> findByCreatedAtBetweenAndClientId(@Param("start") Date start, @Param("end") Date end, @Param("client") UUID clientId);

}