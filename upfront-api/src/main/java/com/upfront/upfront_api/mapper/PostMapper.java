package com.upfront.upfront_api.mapper;

import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.PostEntity;
import com.upfront.upfront_api.utils.ReactionType;
import com.upfront.upfront_api.utils.SecurityUtils;

public class PostMapper {

    public static PostEntity toEntity(PostDto request) {

        return PostEntity.builder()
                .id(request.getId())
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
        if (entity == null) return null;

        long upvotes   = entity.getReactions().stream()
                .filter(r -> ReactionType.LIKE.equals(r.getType())).count();
        long downvotes = entity.getReactions().stream()
                .filter(r -> ReactionType.DISLIKE.equals(r.getType())).count();
        long commentCount = entity.getComments().size();
        boolean isLikedByUser = entity.getReactions().stream()
                .filter(r -> ReactionType.LIKE.equals(r.getType()))
                .anyMatch(r -> r.getUser().getId().equals(SecurityUtils.getCurrentUserId()));
        boolean isDisLikedByUser = entity.getReactions().stream()
                .filter(r -> ReactionType.DISLIKE.equals(r.getType()))
                .anyMatch(r -> r.getUser().getId().equals(SecurityUtils.getCurrentUserId()));
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
                .upvotes(upvotes)
                .downvotes(downvotes)
                .isVerified(entity.getIsVerified())
                .sentiment(entity.getSentiment())
                .comments(commentCount)
                .createdAt(entity.getCreatedAt())
                .likedByUser(isLikedByUser)
                .disLikedByUser(isDisLikedByUser)
                .user(UserDto.builder().id(entity.getUser().getId()).name(entity.getUser().getName()).profileImage(entity.getUser().getProfileImage()).build())
                .build();
    }
}