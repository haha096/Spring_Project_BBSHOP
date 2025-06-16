package com.dongyang.bb_shop.controller;

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
public class UserProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductByIdEntity(id));
    }
}
