package com.ifood.demo.repository;

import java.util.Collection;
import java.util.UUID;


import com.ifood.demo.model.Client;
import com.ifood.demo.model.QClient;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface ClientRepository extends CrudRepository<Client, UUID>, QuerydslPredicateExecutor<Client>,
		QuerydslBinderCustomizer<QClient> {

	@RestResource(path = "byName")
	Collection<Client> findByNameIgnoreCaseContaining(@Param("name") String name);

	@RestResource(path = "byPhone")
	Collection<Client> findByPhoneIgnoreCaseContaining(@Param("phone") String phone);

	@RestResource(path = "byEmail")
	Collection<Client> findByEmailIgnoreCaseContaining(@Param("email") String email);

	@Override
	default public void customize(QuerydslBindings bindings, QClient client) {
		bindings.bind(String.class)
				.first((SingleValueBinding<StringPath, String>) StringExpression::containsIgnoreCase);
	}
}