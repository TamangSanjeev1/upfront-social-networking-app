package com.upfront.upfront_api.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String type;
    private String author;
    private String company;
    private String role;
    private String title;
    private String body;
    private List<String> tags;
    private Double rating;
    private String salary;
    private Boolean isVerified;
    private Long upvotes;
    private Long comments;
    private String sentiment;
    private LocalDateTime createdAt;
    private UserDto user;
}