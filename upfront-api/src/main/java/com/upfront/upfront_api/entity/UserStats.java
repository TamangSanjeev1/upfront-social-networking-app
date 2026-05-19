package com.upfront.upfront_api.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStats {

    private Integer posts;

    private Integer comments;

    private Integer reviews;

    private Integer saved;

    private Integer solutions;

    private Integer upvotes;
}