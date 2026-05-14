package com.upfront.upfront_api.service;

import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User processOAuthLogin(Map<String, Object> attributes) {
        String googleId = String.valueOf(attributes.get("sub"));
        String email    = String.valueOf(attributes.get("email"));
        String name     = String.valueOf(attributes.get("name"));
        String picture  = String.valueOf(attributes.get("picture"));

        return userRepository.findByGoogleId(googleId)
                .map(existing -> {
                    log.info("Existing user login: {}", email);
                    existing.setLastLogin(LocalDateTime.now());
                    existing.setName(name);
                    existing.setProfileImage(picture);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    log.info("New user registration: {}", email);
                    User newUser = User.builder()
                            .googleId(googleId)
                            .email(email)
                            .name(name)
                            .profileImage(picture)
                            .build();
                    return userRepository.save(newUser);
                });
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }
}
