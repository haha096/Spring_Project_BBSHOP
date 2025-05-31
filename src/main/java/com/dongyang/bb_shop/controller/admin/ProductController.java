package com.dongyang.bb_shop.controller.admin;


import com.dongyang.bb_shop.dto.ProductDto;
import com.dongyang.bb_shop.entity.ProductEntity;
import com.dongyang.bb_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Void> createProduct(@RequestBody ProductDto dto) {
        productService.saveProduct(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ProductEntity>> getAllProducts() {
        List<ProductEntity> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        ProductDto dto = productService.getProductById(id);
        return ResponseEntity.ok(dto);
    }


}
