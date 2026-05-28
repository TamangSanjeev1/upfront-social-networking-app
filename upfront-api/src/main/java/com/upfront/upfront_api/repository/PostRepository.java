package com.upfront.upfront_api.repository;

import com.upfront.upfront_api.dto.PostDto;
import com.upfront.upfront_api.entity.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findAllByOrderByCreatedAtDesc();
    Page<PostEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<PostEntity> findByUser_IdOrderByCreatedAtDesc(
            Long userId,
            Pageable pageable
    );

    @Query(
            value = "SELECT p FROM PostEntity p LEFT JOIN FETCH p.reactions WHERE p.user.id = :userId ORDER BY p.createdAt DESC",
            countQuery = "SELECT COUNT(p) FROM PostEntity p WHERE p.user.id = :userId"
    )
    Page<PostEntity> findAllByUserIdWithReactions(@Param("userId") Long userId, Pageable pageable);

    Page<PostEntity> findByTypeOrderByCreatedAtDesc(String type, Pageable pageable);

    Page<PostEntity> findByTypeAndUser_IdOrderByCreatedAtDesc(
            String tag,
            Long userId,
            Pageable pageable
    );
}