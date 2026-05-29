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
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    List<PostEntity> findAllByOrderByCreatedAtDesc();

    @Query(
            value = "SELECT p FROM PostEntity p LEFT JOIN FETCH p.reactions WHERE p.status = 'A' ORDER BY p.createdAt DESC",
            countQuery = "SELECT COUNT(p) FROM PostEntity p"
    )
    Page<PostEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<PostEntity> findByUser_IdOrderByCreatedAtDesc(
            Long userId,
            Pageable pageable
    );

    @Query(
            value = "SELECT p FROM PostEntity p LEFT JOIN FETCH p.reactions WHERE p.status = 'A' AND p.user.id = :userId ORDER BY p.createdAt DESC",
            countQuery = "SELECT COUNT(p) FROM PostEntity p WHERE p.user.id = :userId"
    )
    Page<PostEntity> findAllByUserIdWithReactions(@Param("userId") Long userId, Pageable pageable);

    @Query(
            value = """
        SELECT DISTINCT p
        FROM PostEntity p
        LEFT JOIN FETCH p.reactions
        WHERE p.type = :type AND p.status = 'A'
        ORDER BY p.createdAt DESC
    """,
            countQuery = """
        SELECT COUNT(p)
        FROM PostEntity p
        WHERE p.user.id = :userId
        AND :tag MEMBER OF p.tags
    """
    )
    Page<PostEntity> findByTypeOrderByCreatedDateDesc(
            @Param("type") String type,
            Pageable pageable
    );

    Page<PostEntity> findByTypeOrderByCreatedAtDesc(String type, Pageable pageable);

    @Query(
            value = """
        SELECT DISTINCT p
        FROM PostEntity p
        LEFT JOIN FETCH p.reactions
        LEFT JOIN FETCH p.comments
        WHERE p.user.id = :userId AND p.status = 'A'
        AND :tag MEMBER OF p.tags
        ORDER BY p.createdAt DESC
    """,
            countQuery = """
        SELECT COUNT(p)
        FROM PostEntity p
        WHERE p.user.id = :userId
        AND :tag MEMBER OF p.tags
    """
    )
    Page<PostEntity> findPostByUserAndTag(
            @Param("tag") String tag,
            @Param("userId") Long userId,
            Pageable pageable
    );

    Page<PostEntity> findByTypeAndUser_IdOrderByCreatedAtDesc(
            String tag,
            Long userId,
            Pageable pageable
    );

    Optional<PostEntity> findByIdAndUserId(Long id, Long userId);
}