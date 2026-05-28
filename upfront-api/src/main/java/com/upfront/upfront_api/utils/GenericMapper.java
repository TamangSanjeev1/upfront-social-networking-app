package com.upfront.upfront_api.utils;

import com.upfront.upfront_api.dto.UserDto;
import com.upfront.upfront_api.entity.User;

public class GenericMapper {
    public static UserDto mapUserDto(User user) {
        if (user == null) return null;
        return UserDto.builder().id(user.getId()).name(user.getName()).profileImage(user.getProfileImage()).build();
    }
}
