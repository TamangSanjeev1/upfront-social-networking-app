package com.upfront.upfront_api.dto;

import com.upfront.upfront_api.entity.SocialLinks;
import com.upfront.upfront_api.entity.UserSkill;
import com.upfront.upfront_api.entity.UserStats;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDto {
    private Long id;
    private String googleId;
    private String name;
    private String email;
    private String aliasName;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private String title;
    private String bio;
    private String location;
    private String company;
    private String coverUrl;
    private Long reputation;
    private Integer followers;
    private Integer following;
    private Boolean isVerified;
    private SocialLinks socialLinks;
    private UserStats stats;
    private List<UserSkill> skills = new ArrayList<>();
    private Integer karma = 0;
    private Integer postCount = 0;
    private Integer likes = 0;
    private Integer postViews = 0;
}
