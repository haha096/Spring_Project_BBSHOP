package com.dongyang.bb_shop.controller.admin;


import com.dongyang.bb_shop.dto.ProductDto;
import com.dongyang.bb_shop.entity.ProductEntity;
import com.dongyang.bb_shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Void> createProduct(
            @RequestPart("dto") ProductDto dto,
            @RequestPart("image") MultipartFile imageFile) throws IOException {

        String saveDir = System.getProperty("user.dir") + "/src/main/resources/static/images";
        String filename = imageFile.getOriginalFilename();
        Path filepath = Paths.get(saveDir, filename);

        // 이미지 저장
        Files.createDirectories(filepath.getParent());
        Files.copy(imageFile.getInputStream(), filepath, StandardCopyOption.REPLACE_EXISTING);

        // 이미지 경로 설정
        dto.setImageUrl("/images/" + filename);

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
