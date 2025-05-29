package com.dongyang.bb_shop.repository;


import com.dongyang.bb_shop.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
