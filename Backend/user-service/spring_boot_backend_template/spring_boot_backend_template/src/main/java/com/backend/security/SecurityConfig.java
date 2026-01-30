package com.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JwtFilter jwtFilter,
                          CustomUserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // 🌍 CORS (React)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ❌ CSRF (JWT → stateless)
            .csrf(csrf -> csrf.disable())

            // 🔒 STATELESS SESSION
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔐 AUTH PROVIDER
            .authenticationProvider(authenticationProvider())

            // 🔑 AUTH RULES (ORDER MATTERS)
            .authorizeHttpRequests(auth -> auth

                // ✅ REQUIRED FOR REACT PREFLIGHT
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/tickets/myticket").authenticated()

                // 🌐 PUBLIC APIs
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/buses/**").permitAll()
                

                // 🔒 USER ACTIONS
                .requestMatchers(HttpMethod.PUT, "/buses/book-seat").hasRole("USER")

                // 🎟️ TICKETS (JWT REQUIRED)
                .requestMatchers("/tickets/**").permitAll()


                // 🔐 EVERYTHING ELSE
                .anyRequest().authenticated()
            )

            // 🔐 JWT FILTER
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔐 AUTH PROVIDER
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // 🔑 PASSWORD ENCODER (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🎯 AUTH MANAGER
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    // 🌍 CORS CONFIG
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
