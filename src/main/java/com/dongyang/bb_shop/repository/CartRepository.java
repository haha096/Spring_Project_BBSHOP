package com.dongyang.bb_shop.repository;

import com.dongyang.bb_shop.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    List<CartEntity> findByUserId(Long userId);
    Optional<CartEntity> findByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
