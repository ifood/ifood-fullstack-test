package com.ifood.demo.client;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.criteria.Predicate;


public interface ClientRepository extends CrudRepository<Client, UUID> {

	@RestResource(path = "byName")
	Collection<Client> findByNameIgnoreCaseContaining(@Param("name") String name);

	@RestResource(path = "byPhone")
	Collection<Client> findByPhoneIgnoreCaseContaining(@Param("phone") String phone);

	@RestResource(path = "byEmail")
	Collection<Client> findByEmailIgnoreCaseContaining(@Param("email") String email);

    @RestResource(path = "byCustomQuery")
    @Query("select c from Client c where c.id = :id and c.name like %:name% and phone like %:phone% and email like %:email%")
    List<Client> findByCustomQueryIgnoreCaseContaining(@Param("id") UUID id, @Param("name") String name, @Param("phone") String phone, @Param("email") String email);

}
