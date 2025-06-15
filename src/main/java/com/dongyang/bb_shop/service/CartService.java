package com.dongyang.bb_shop.service;


import com.dongyang.bb_shop.entity.CartEntity;
import com.dongyang.bb_shop.entity.ProductEntity;
import com.dongyang.bb_shop.repository.CartRepository;
import com.dongyang.bb_shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public void addToCart(Long userId, Long productId, int quantity) {
        var existing = cartRepository.findByUserIdAndProductId(userId, productId);
        if (existing.isPresent()) {
            CartEntity item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartRepository.save(item);
        } else {
            ProductEntity product = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않음"));

            CartEntity item = new CartEntity();
            item.setUserId(userId);
            item.setProductId(productId);
            item.setProductName(product.getName());
            item.setProductPrice(product.getPrice());
            item.setProductImageUrl(product.getImageUrl());
            item.setQuantity(quantity);

            cartRepository.save(item);
        }
    }

    public List<CartEntity> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Transactional
    public void deleteItem(Long userId, Long productId) {
        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.findByUserId(userId)
                .forEach(item -> cartRepository.deleteById(item.getId()));
    }
}
