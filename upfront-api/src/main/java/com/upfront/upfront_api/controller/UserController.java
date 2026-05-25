package com.upfront.upfront_api.controller;

import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.exception.ResourceNotFoundException;
import com.upfront.upfront_api.mapper.UserMapper;
import com.upfront.upfront_api.security.jwt.UserPrincipal;
import com.upfront.upfront_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userService.findByEmail(principal.getEmail());
        return ResponseEntity.ok(UserMapper.toResponse(user, false));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User updateUserDetails(Principal principal, @RequestBody UserDto userDto) {
        return userService.updateUserDetails(principal.getName(), userDto);
    }

    @GetMapping
    public UserDto getUserById(@RequestParam("id") Long id) {
        if (id == null) {
            throw new ResourceNotFoundException("Id cannot be null", "");
        }
        User user = userService.findById(id);
        return UserMapper.toResponse(user, true);
    }
}
