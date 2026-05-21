package com.upfront.upfront_api.repository;

import com.upfront.upfront_api.entity.NotificationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findAllByOrderByTimestampDesc();
    Page<NotificationEntity> findAllByOrderByTimestampDesc(Pageable pageable);
    @Query("""
    SELECT n
    FROM NotificationEntity n
    WHERE n.user.id = :userId
       OR n.user IS NULL
    ORDER BY n.timestamp DESC
    """)
    Page<NotificationEntity> findByUserIdOrGlobal(
            @Param("userId") Long userId,
            Pageable pageable
    );
}