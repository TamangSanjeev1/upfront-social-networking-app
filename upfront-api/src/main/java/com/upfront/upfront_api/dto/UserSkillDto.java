package com.upfront.upfront_api.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSkillDto {
    private Long id;
    private String name;
    private String level;
    private Integer endorsements;
    private UserDto user;
}