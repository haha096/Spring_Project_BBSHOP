package com.dongyang.bb_shop.controller;


import com.dongyang.bb_shop.entity.CartEntity;
import com.dongyang.bb_shop.service.CartService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CartController {
    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> body, HttpSession session) {
        Long userId = (Long) session.getAttribute("loginUserId");
        System.out.println("🛒 장바구니 추가 요청한 사용자 ID: " + userId);
        if (userId == null) return ResponseEntity.status(401).body("로그인 필요");

        Long productId = Long.valueOf(body.get("productId").toString());
        int quantity = Integer.parseInt(body.get("quantity").toString());

        cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok("추가됨");
    }

    @GetMapping
    public ResponseEntity<List<CartEntity>> getCart(HttpSession session) {
        Long userId = (Long) session.getAttribute("loginUserId");
        if (userId == null) return ResponseEntity.status(401).build();

        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteItem(@PathVariable Long productId, HttpSession session) {
        Long userId = (Long) session.getAttribute("loginUserId");
        if (userId == null) return ResponseEntity.status(401).build();

        cartService.deleteItem(userId, productId);
        return ResponseEntity.ok("삭제됨");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(HttpSession session) {
        Long userId = (Long) session.getAttribute("loginUserId");
        if (userId == null) return ResponseEntity.status(401).build();

        cartService.clearCart(userId);
        return ResponseEntity.ok("비움");
    }
}
