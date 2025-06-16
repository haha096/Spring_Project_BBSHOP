package com.dongyang.bb_shop.controller;


import com.dongyang.bb_shop.entity.CartEntity;
import com.dongyang.bb_shop.security.UserPrincipal;
import com.dongyang.bb_shop.service.CartService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<?> addToCart(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                       @RequestBody Map<String, Object> body) {

        Long userId = userPrincipal.getUser().getId();
        Long productId = Long.valueOf(body.get("productId").toString());
        int quantity = Integer.parseInt(body.get("quantity").toString());

        System.out.println("JWT기반 장바구니 추가 요청한 사용자 ID: " + userId);
        cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok("추가됨");
    }

    @GetMapping
    public ResponseEntity<List<CartEntity>> getCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = userPrincipal.getUser().getId();
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteItem(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @PathVariable Long productId) {
        Long userId = userPrincipal.getUser().getId();
        cartService.deleteItem(userId, productId);
        return ResponseEntity.ok("삭제됨");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = userPrincipal.getUser().getId();
        cartService.clearCart(userId);
        return ResponseEntity.ok("비움");
    }
}
