package com.ifood.demo.repository;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.UUID;

import com.ifood.demo.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;


public interface ClientRepository extends CrudRepository<Client, UUID> {

	@RestResource(path = "byName")
	Collection<Client> findByNameIgnoreCaseContaining(@Param("name") String name);
	
	@RestResource(path = "byPhone")
	Collection<Client> findByPhoneIgnoreCaseContaining(@Param("phone") String phone);
	
	@RestResource(path = "byEmail")
	Collection<Client> findByEmailIgnoreCaseContaining(@Param("email") String email);

//	@Query(value = "Select * from Clients c" +
//			"where (:name is null or c.name = :name) and" +
//			"(:phone is null or c.phone = :phone) and" +
//			"(:email is null or c.email = :email)" +
//			"order by c.name"
//	)
//	Page<Client> findAllByAllCriterias(@Param("name") String name,
//								   @Param("phone") String phone,
//								   @Param("email") String email,
//								   Pageable pageable);
}