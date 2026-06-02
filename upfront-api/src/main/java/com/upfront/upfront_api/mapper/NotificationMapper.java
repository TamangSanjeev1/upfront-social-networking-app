package com.upfront.upfront_api.mapper;

import com.upfront.upfront_api.dto.NotificationDto;
import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.NotificationEntity;
import com.upfront.upfront_api.utils.NotificationEnum;
import com.upfront.upfront_api.utils.SecurityUtils;

import java.time.LocalDateTime;

public class NotificationMapper {

    public static NotificationEntity toEntity(String title, NotificationEnum notificationEnum) {
        return NotificationEntity.builder()
                .unread(true)
                .iconBg(notificationEnum.getIconBg())
                .type(notificationEnum.getType())
                .title(notificationEnum.getTitle() + SecurityUtils.getCurrentName())
                .body(title)
                .timestamp(LocalDateTime.now())
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