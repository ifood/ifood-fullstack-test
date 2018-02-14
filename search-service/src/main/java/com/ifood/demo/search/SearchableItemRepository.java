package com.ifood.demo.search;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.Collection;
import java.util.UUID;

@RestResource(exported = false)
public interface SearchableItemRepository extends CrudRepository<SearchableItem, UUID>,
        QueryDslPredicateExecutor<SearchableItem> {

    Collection<SearchableItem> findByOrderId(UUID orderId);
}