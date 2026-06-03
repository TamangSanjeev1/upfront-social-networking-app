package com.upfront.upfront_api.repository;

import com.upfront.upfront_api.entity.ReactionEntity;
import com.upfront.upfront_api.utils.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionEntity, Long> {

    Optional<ReactionEntity> findTopByPostIdAndUserIdOrderByCreatedAtDesc(
            Long postId,
            Long userId
    );

    Optional<ReactionEntity> findByPostIdAndUserIdAndStatus(Long postId, Long userId, String status);

    @Query("SELECT COUNT(r) FROM ReactionEntity r WHERE r.status = 'A' AND r.post.id = :postId AND r.type = :type")
    long countByPostIdAndType(@Param("postId") Long postId, @Param("type") ReactionType type);
}
