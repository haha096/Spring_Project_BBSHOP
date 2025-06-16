package com.dongyang.bb_shop.controller;

import com.dongyang.bb_shop.dto.ProductDto;
import com.dongyang.bb_shop.entity.ProductEntity;
import com.dongyang.bb_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PublicProductController {

    private final ProductService productService;

    @GetMapping("/public/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto dto = productService.getProductById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/public")
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
}
