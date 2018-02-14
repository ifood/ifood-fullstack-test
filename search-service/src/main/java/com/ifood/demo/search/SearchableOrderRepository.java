package com.ifood.demo.search;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;
import java.util.UUID;

public interface SearchableOrderRepository extends CrudRepository<SearchableOrder, UUID>,
        QueryDslPredicateExecutor<SearchableOrder> {

    @RestResource(exported = false)
    Collection<SearchableOrder> findByClientId(UUID clientId);
}