package com.upfront.upfront_api.mapper;

import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.PostEntity;

public class PostMapper {

    public static PostEntity toEntity(PostDto request) {

        return PostEntity.builder()
                .type(request.getType())
                .author(request.getAuthor())
                .company(request.getCompany())
                .role(request.getRole())
                .title(request.getTitle())
                .body(request.getBody())
                .tags(request.getTags())
                .rating(request.getRating())
                .salary(request.getSalary())
                .isVerified(request.getIsVerified())
                .sentiment(request.getSentiment())
                .build();
    }

    public static PostDto toResponse(PostEntity entity) {
        return PostDto.builder()
                .id(entity.getId())
                .type(entity.getType())
                .author(entity.getAuthor())
                .company(entity.getCompany())
                .role(entity.getRole())
                .title(entity.getTitle())
                .body(entity.getBody())
                .tags(entity.getTags())
                .rating(entity.getRating())
                .salary(entity.getSalary())
                .upvotes(entity.getUpvotes())
                .comments(entity.getComments())
                .isVerified(entity.getIsVerified())
                .sentiment(entity.getSentiment())
                .createdAt(entity.getCreatedAt())
                .user(UserDto.builder().id(entity.getUser().getId()).name(entity.getUser().getName()).profileImage(entity.getUser().getProfileImage()).build())
                .build();
    }
}