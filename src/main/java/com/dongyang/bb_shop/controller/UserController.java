package com.dongyang.bb_shop.controller;

import com.dongyang.bb_shop.dto.UserDto;
import com.dongyang.bb_shop.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody UserDto dto) {
        userService.signup(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody UserDto dto, HttpSession session) {
        boolean result = userService.login(dto.getUsername(), dto.getPassword());

        if (result) {
            // 세션에 사용자 정보 저장
            session.setAttribute("loginUser", dto.getUsername());
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/mypage")
    public ResponseEntity<String> myPage(HttpSession session) {
        String loginUser = (String) session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.status(401).body("로그인 필요");
        }

        return ResponseEntity.ok("환영합니다! " + loginUser + "님");
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate(); // 세션 초기화 (로그아웃)
        return ResponseEntity.ok().build();
    }


    @GetMapping("/check")
    public ResponseEntity<String> checkLogin(HttpSession session) {
        String loginUser = (String) session.getAttribute("loginUser");
        if (loginUser == null) {
            return ResponseEntity.status(401).body("NOT_LOGGED_IN");
        }
        return ResponseEntity.ok(loginUser);
    }
}