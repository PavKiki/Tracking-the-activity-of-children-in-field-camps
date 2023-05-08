package com.diploma.langPlus.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("api/v1/**")
            .allowedOrigins("http://localhost:3000", "http://localhost:8080")
            .allowedMethods("*")
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}