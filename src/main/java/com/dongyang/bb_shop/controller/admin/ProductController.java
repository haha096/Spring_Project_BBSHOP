package com.dongyang.bb_shop.controller.admin;


import com.dongyang.bb_shop.dto.ProductDto;
import com.dongyang.bb_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Void> createProduct(@RequestBody ProductDto dto) {
        productService.saveProduct(dto);
        return ResponseEntity.ok().build();
    }
}
