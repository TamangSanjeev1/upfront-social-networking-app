package com.upfront.upfront_api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "google_id", nullable = false, unique = true)
    private String googleId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String aliasName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String location;

    private String company;

    private String coverUrl;

    private Long reputation;

    private int karma = 0;
    private int postCount = 0;
    private int likes = 0;
    private int postViews = 0;

    private Integer followers;

    private Integer following;

    private Boolean isVerified;

    @Embedded
    private SocialLinks socialLinks;

    @Embedded
    private UserStats stats;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSkill> skills = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastLogin = LocalDateTime.now();
    }
}
