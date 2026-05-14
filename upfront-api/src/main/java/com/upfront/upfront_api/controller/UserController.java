package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "profileImage", user.getProfileImage() != null ? user.getProfileImage() : "",
                "createdAt", user.getCreatedAt().toString(),
                "lastLogin", user.getLastLogin().toString()
        ));
    }
}
