package com.upfront.upfront_api.entity;

import com.upfront.upfront_api.utils.SecurityUtils;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String title;

    private String iconBg;

    private String body;

    private Boolean unread;

    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User creator;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
        creator = User.builder().id(SecurityUtils.getCurrentUserId()).build();
    }
}