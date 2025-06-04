package com.dongyang.bb_shop.service;


import com.dongyang.bb_shop.dto.ProductDto;
import com.dongyang.bb_shop.entity.ProductEntity;
import com.dongyang.bb_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public void saveProduct(ProductDto dto) {
        ProductEntity product = ProductEntity.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .category(dto.getCategory())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .build();

        productRepository.save(product);
    }

    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    public ProductDto getProductById(Long id) {
        ProductEntity entity = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + id));

        ProductDto dto = new ProductDto();
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setCategory(entity.getCategory());
        dto.setDescription(entity.getDescription());
        dto.setImageUrl(entity.getImageUrl());
        dto.setId(entity.getId());

        return dto;
    }
}
