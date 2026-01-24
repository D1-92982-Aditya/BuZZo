package com.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // ✅ Check Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                // ✅ Validate token
                if (jwtUtil.validateToken(token)) {

                    // ✅ Extract username/email (MUST match JwtUtil)
                    String email = jwtUtil.extractUsername(token);

                    // ✅ Only set auth if not already authenticated
                    if (email != null &&
                        SecurityContextHolder.getContext().getAuthentication() == null) {

                        UserDetails userDetails =
                                userDetailsService.loadUserByUsername(email);

                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        authToken.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder.getContext()
                                .setAuthentication(authToken);
                    }
                }

            } catch (UsernameNotFoundException ex) {
                // 🔕 User not found → continue request as anonymous
                System.out.println("JWT user not found: " + ex.getMessage());

            } catch (Exception ex) {
                // 🔕 Any JWT parsing / validation error
                System.out.println("JWT filter error: " + ex.getMessage());
            }
        }

        // ✅ Always continue filter chain
        filterChain.doFilter(request, response);
    }
}
