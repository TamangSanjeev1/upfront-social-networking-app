package com.upfront.upfront_api.entity;

import com.upfront.upfront_api.utils.SecurityUtils;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * review, discussion, salary, interview etc
     */
    @Column(nullable = false, length = 50)
    private String type;

    @Column(nullable = false, length = 150)
    private String author;

    private String company;

    @Column(length = 150)
    private String role;

    @Column(nullable = false, length = 300)
    private String title;

    @Lob
    @Column(nullable = false)
    private String body;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "post_tags",
            joinColumns = @JoinColumn(name = "post_id")
    )
    @Column(name = "tag")
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Column(precision = 2)
    private Double rating;

    @Column(length = 50)
    private String salary;

    @Builder.Default
    private Boolean isUpvoted = false;

    @Builder.Default
    private Boolean isVerified = false;

    /**
     * positive, negative, mixed
     */
    @Column(length = 50)
    private String sentiment;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ReactionEntity> reactions = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        user = User.builder().id(SecurityUtils.getCurrentUserId()).build();
        author = SecurityUtils.getCurrentName();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}