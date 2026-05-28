package com.upfront.upfront_api.repository;

import com.upfront.upfront_api.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {
    @Query("""
        SELECT c FROM CommentEntity c
        LEFT JOIN FETCH c.user
        WHERE c.post.id = :postId
        ORDER BY c.createdAt DESC
    """)
    List<CommentEntity> findAllByPostId(@Param("postId") Long postId);

    long countByPostId(Long postId);
}