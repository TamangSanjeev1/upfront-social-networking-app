package com.upfront.upfront_api.mapper;

import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.utils.SecurityUtils;

public class UserMapper {

    public static User toEntity(UserDto request) {
        return User.builder()
                .name(request.getName())
                .aliasName(SecurityUtils.randomUserNameGenerator())
                .email(request.getEmail())
                .profileImage(request.getProfileImage())
                .title(request.getTitle())
                .bio(request.getBio())
                .location(request.getLocation())
                .company(request.getCompany())
                .coverUrl(request.getCoverUrl())
                .reputation(request.getReputation())
                .followers(request.getFollowers())
                .following(request.getFollowing())
                .isVerified(request.getIsVerified())
                .socialLinks(request.getSocialLinks())
                .stats(request.getStats())
                .karma(request.getKarma())
                .postCount(request.getPostCount())
                .likes(request.getLikes())
                .postViews(request.getPostViews())
                .build();
    }

    public static UserDto toResponse(User entity, boolean hideInfo) {
        return UserDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .aliasName(entity.getAliasName())
                .profileImage(entity.getProfileImage() != null ? entity.getProfileImage() : "")
                .createdAt(entity.getCreatedAt())
                .lastLogin(hideInfo ? null : entity.getLastLogin())
                .title(entity.getTitle())
                .bio(entity.getBio())
                .location(entity.getLocation())
                .company(entity.getCompany())
                .coverUrl(entity.getCoverUrl())
                .reputation(entity.getReputation())
                .followers(entity.getFollowers())
                .following(entity.getFollowing())
                .isVerified(entity.getIsVerified())
                .socialLinks(entity.getSocialLinks())
                .stats(entity.getStats())
                .karma(entity.getKarma())
                .postCount(entity.getPostCount())
                .likes(entity.getLikes())
                .postViews(entity.getPostViews())
                .build();
    }
}