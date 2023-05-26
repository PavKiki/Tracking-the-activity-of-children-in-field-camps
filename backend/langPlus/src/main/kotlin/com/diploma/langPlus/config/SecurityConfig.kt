package com.diploma.langPlus.config

import com.diploma.langPlus.security.JwtAuthFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.authentication.logout.LogoutHandler
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.util.*


@Configuration
@EnableWebSecurity
class SecurityConfig(
    val jwtAuthFilter: JwtAuthFilter,
    val authenticationProvider: AuthenticationProvider,
    val logoutHandler: LogoutHandler
) {
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://localhost:3000")
        configuration.allowedMethods = listOf("*")
        configuration.allowedHeaders = listOf("*")
        configuration.allowCredentials = true
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .cors()
            .and()
            .csrf()
            .disable()
            .authorizeHttpRequests()
            //разрешенные всем api
            .requestMatchers(
                "/api/v1/auth/**",
                "/api/v1/activity/get",
                "/api/v1/timetable/allbydate",
                "/api/v1/sports/tournament/getAll",
                "/api/v1/sports/getGrid",
                "/api/v1/team/all",
                "/api/v1/child/byteamTitle",
                "/api/v1/points/ofTeam",
                "/api/v1/team/points",
                "/api/v1/creativity/events/all",
                "/api/v1/creativity/places/byEvent"
            )
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter::class.java)
            .logout()
            .logoutUrl("/api/v1/auth/logout")
            .addLogoutHandler(logoutHandler)
            .logoutSuccessHandler { request, response, authentication -> SecurityContextHolder.clearContext() }
            .deleteCookies("jwt-access", "jwt-refresh")

        return http.build()
    }
}