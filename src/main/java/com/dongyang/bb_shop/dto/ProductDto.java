package com.dongyang.bb_shop.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDto {
    private String name;
    private int price;
    private String category;
    private String description;
    private String imageUrl;
}
