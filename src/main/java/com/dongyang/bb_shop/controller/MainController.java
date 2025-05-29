package com.dongyang.bb_shop.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class MainController {
    @GetMapping("/")
    public String mainPage() {
        return "Main";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("userId", "");
        model.addAttribute("saveLogin", false);
        return "boaders/Login/Login";
    }

    @GetMapping("/signup")
    public String signupPage() {
        return "boaders/Login/SignUp"; // 위치에 따라 조정
    }

    @GetMapping("/mypage")
    public String mypage(Model model) {
        model.addAttribute("userId", "haha");
        model.addAttribute("email", "aa@aa");
        model.addAttribute("address", "");
        return "boaders/Mypage/Mypage";  // 템플릿 경로에 따라 조정
    }

//    @GetMapping("/cart")
//    public String cartPage(Model model) {
//        List<CartItem> cart = List.of(
//                new CartItem("가면산장 살인사건", 1, 12000),
//                new CartItem("가면산장 살인사건", 1, 12000)
//        );
//        model.addAttribute("cartItems", cart);
//        model.addAttribute("total", 24000);
//        return "boaders/Mypage/Cart";
//    }
//
//    @GetMapping("/orders")
//    public String ordersPage(Model model) {
//        List<OrderItem> orders = List.of(
//                new OrderItem("가면산장 살인사건", 1, 12000, "배송중"),
//                new OrderItem("가면산장 살인사건", 1, 12000, "완료")
//        );
//        model.addAttribute("orderItems", orders);
//        return "boaders/Mypage/Orders";
//    }

    @GetMapping("/cart")
    public String cartPage(Model model) {
        return "boaders/Mypage/Cart";
    }

    @GetMapping("/orders")
    public String ordersPage(Model model) {
        return "boaders/Mypage/Orders";
    }

}


