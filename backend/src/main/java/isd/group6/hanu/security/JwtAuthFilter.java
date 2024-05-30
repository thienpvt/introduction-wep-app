package isd.group6.hanu.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import isd.group6.hanu.common.ResponseStatus;
import isd.group6.hanu.common.StatusTemplate;
import isd.group6.hanu.service.impl.UserInfoService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

/**
 * @author Thienpv
 * @Email pvtcwd@gmail.com
 * @Version 1.0
 * 12/3/2024
 * Filter class to authenticate the request
 */

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoService userDetailsService;

    @Autowired
    private ObjectMapper mapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;
        // 2. validate the header and check the prefix
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response); // If not valid, go to the next filter.
            return;
        }
        try{
            if(request.getMethod().equals("GET")) {
                filterChain.doFilter(request, response);
                return;
            }
            if (!authHeader.startsWith("Bearer ")) throw new Exception("Token must start with Bearer");
            token = authHeader.replace("Bearer ", "");
            username = jwtService.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (Boolean.TRUE.equals(jwtService.validateToken(token, userDetails))) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        }catch (Exception e){
            SecurityContextHolder.clearContext();
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            ResponseStatus responseStatus;
            if (e.getMessage().contains("no longer valid")) {
                responseStatus = StatusTemplate.EXPIRE_TOKEN;
            } else {
                responseStatus = StatusTemplate.TOKEN_IN_VALID;
            }
            this.mapper.writeValue(response.getOutputStream(), responseStatus);
        }

    }
}
