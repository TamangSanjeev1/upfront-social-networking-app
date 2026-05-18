package com.upfront.upfront_api.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialLinks {

    private String github;

    private String linkedin;

    private String portfolio;

    private String twitter;

    private String website;
}