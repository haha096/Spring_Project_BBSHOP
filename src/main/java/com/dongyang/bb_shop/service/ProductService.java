package com.dongyang.bb_shop.service;


import com.dongyang.bb_shop.dto.ProductDto;
import com.dongyang.bb_shop.entity.ProductEntity;
import com.dongyang.bb_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
