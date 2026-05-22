package com.upfront.upfront_api.mapper;

import com.upfront.upfront_api.dto.NotificationDto;
import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.NotificationEntity;

public class NotificationMapper {

    public static NotificationEntity toEntity(NotificationDto request) {
        return NotificationEntity.builder()
                .id(request.getId())
                .type(request.getType())
                .title(request.getTitle())
                .body(request.getBody())
                .iconBg(request.getIconBg())
                .unread(request.getUnread())
                .build();
    }

    public static NotificationDto toResponse(NotificationEntity entity) {
        return NotificationDto.builder()
                .id(entity.getId())
                .type(entity.getType())
                .title(entity.getTitle())
                .body(entity.getBody())
                .iconBg(entity.getIconBg())
                .unread(entity.getUnread())
                .timestamp(entity.getTimestamp())
                .user(entity.getUser() == null ?  null : UserDto.builder().id(entity.getUser().getId()).name(entity.getUser().getName()).profileImage(entity.getUser().getProfileImage()).build())
                .build();
    }
}