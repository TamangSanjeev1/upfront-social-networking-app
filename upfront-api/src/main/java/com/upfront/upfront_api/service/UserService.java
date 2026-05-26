package com.upfront.upfront_api.service;

import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.entity.UserSkill;
import com.upfront.upfront_api.exception.ResourceNotFoundException;
import com.upfront.upfront_api.repository.UserRepository;
import com.upfront.upfront_api.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

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
                            .aliasName(SecurityUtils.randomUserNameGenerator())
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

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    public User updateUserDetails(String email, UserDto user) {
        return userRepository.findByEmail(email)
                .map(existingUser -> {
                    log.info("User found: {}", existingUser.getEmail());
                    existingUser.setTitle(user.getTitle());
                    existingUser.setBio(user.getBio());
                    existingUser.setLocation(user.getLocation());
                    existingUser.setCompany(user.getCompany());
                    existingUser.setCoverUrl(user.getCoverUrl());
                    existingUser.setReputation(user.getReputation());
                    existingUser.setFollowers(user.getFollowers());
                    existingUser.setFollowing(user.getFollowing());
                    existingUser.setIsVerified(user.getIsVerified());
                    existingUser.setSocialLinks(user.getSocialLinks());
                    existingUser.setStats(user.getStats());

                    existingUser.getSkills().clear();

                    if (user.getSkills() != null) {
                        for (UserSkill skill : user.getSkills()) {
                            skill.setUser(existingUser);
                            existingUser.getSkills().add(skill);
                        }
                    }

                    return userRepository.save(existingUser);
                })
                .orElseGet(() -> {
                    log.info("User not found {}", user.getEmail());
                    throw new ResourceNotFoundException("User not found {}", user.getEmail());
                });
    }

    public void updateUserCounts() {
        userRepository.findById(Objects.requireNonNull(SecurityUtils.getCurrentUserId()))
                .map(existingUser -> {
                    log.info("User found: {}", existingUser.getEmail());
                    existingUser.setKarma(existingUser.getKarma()+1);
                    existingUser.setPostCount(existingUser.getPostCount()+1);
                    return userRepository.save(existingUser);
                })
                .orElseGet(() -> {
                    log.info("User not found");
                    throw new ResourceNotFoundException("User not found", null);
                });
    }
}
