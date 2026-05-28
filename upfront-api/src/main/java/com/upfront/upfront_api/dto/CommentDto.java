package com.upfront.upfront_api.dto;

import com.upfront.upfront_api.entity.PostEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long id;
    private String body;
    private PostEntity post;
    private UserDto user;
    private String author;
    private LocalDateTime createdAt = LocalDateTime.now();
}