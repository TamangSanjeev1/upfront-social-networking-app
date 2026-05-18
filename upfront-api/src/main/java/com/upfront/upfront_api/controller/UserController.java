package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.security.jwt.UserPrincipal;
import com.upfront.upfront_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(Authentication authentication) {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userService.findByEmail(principal.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("profileImage", user.getProfileImage() != null ? user.getProfileImage() : "");
        response.put("createdAt", user.getCreatedAt().toString());
        response.put("lastLogin", user.getLastLogin().toString());
        response.put("title", user.getTitle());
        response.put("bio", user.getBio());
        response.put("location", user.getLocation());
        response.put("company", user.getCompany());
        response.put("coverUrl", user.getCoverUrl());
        response.put("reputation", user.getReputation());
        response.put("followers", user.getFollowers());
        response.put("following", user.getFollowing());
        response.put("isVerified", user.getIsVerified());
        response.put("socialLinks", user.getSocialLinks());
        response.put("stats", user.getStats());
        response.put("skills", user.getSkills());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User updateUserDetails(Principal principal, @RequestBody UserDto userDto) {
        return userService.updateUserDetails(principal.getName(), userDto);
    }

}
