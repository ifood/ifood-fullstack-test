package com.ifood.demo.client.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.web.config.QuerydslWebConfiguration;

@Configuration
@Import({QuerydslWebConfiguration.class})
public class QuerydslConfig {
}
