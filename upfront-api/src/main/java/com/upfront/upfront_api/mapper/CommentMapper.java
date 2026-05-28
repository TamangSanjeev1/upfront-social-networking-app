package com.upfront.upfront_api.mapper;

import com.upfront.upfront_api.dto.CommentDto;
import com.upfront.upfront_api.entity.CommentEntity;
import com.upfront.upfront_api.entity.User;
import com.upfront.upfront_api.utils.GenericMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class CommentMapper {

    public CommentDto toDto(CommentEntity entity) {
        if (entity == null) return null;

        User user = entity.getUser();

        return CommentDto.builder()
                .id(entity.getId())
                .body(entity.getBody())
                .author(user.getName())
                .createdAt(entity.getCreatedAt())
                .user(GenericMapper.mapUserDto(entity.getUser()))
                .build();
    }

    public List<CommentDto> toDtoList(List<CommentEntity> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream().map(this::toDto).toList();
    }
}