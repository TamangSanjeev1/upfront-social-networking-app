package com.upfront.upfront_api.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@AllArgsConstructor
public class UserPrincipal implements UserDetails {

    private Long id;
    private String email;
    private String googleId;
    private String name;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(String email, Long id, String googleId, String name) {
        this.id = id;
        this.email = email;
        this.googleId = googleId;
        this.name = name;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return null;
    }
}