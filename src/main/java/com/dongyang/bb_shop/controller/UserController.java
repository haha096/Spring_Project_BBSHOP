package com.dongyang.bb_shop.controller;

import com.dongyang.bb_shop.dto.UserDto;
import com.dongyang.bb_shop.entity.UserEntity;
import com.dongyang.bb_shop.jwt.JwtUtil;
import com.dongyang.bb_shop.repository.UserRepository;
import com.dongyang.bb_shop.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody UserDto dto) {
        userService.signup(dto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto dto) {
        Optional<UserEntity> userOpt = userService.authenticate(dto.getUsername(), dto.getPassword());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("로그인 실패");
        }

        UserEntity user = userOpt.get();
        String role = user.isAdmin() ? "ROLE_ADMIN" : "ROLE_USER";

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(user.getUsername(), role);

        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/mypage")
    public ResponseEntity<String> myPage(HttpSession session) {
        String loginUser = (String) session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.status(401).body("로그인 필요");
        }

        return ResponseEntity.ok("환영합니다! " + loginUser + "님");
    }

//    @PostMapping("/logout")
//    public ResponseEntity<Void> logout(HttpSession session) {
//        session.invalidate();
//        return ResponseEntity.ok().build();
//    }


    @GetMapping("/check")
    public ResponseEntity<?> checkLogin(Authentication auth) {
        if (auth != null && auth.isAuthenticated()) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(401).body(false);
    }


    //내정보 페이지에서 로그인된 유저의 정보를 보여주는 GetMapping
    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserInfo(Authentication auth) {
        String username = auth.getName(); // JWT에서 가져옴

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        UserDto dto = new UserDto(user);
        return ResponseEntity.ok(dto);
    }

    // 아이디 수정
    @PutMapping("/updateusername")
    public ResponseEntity<?> updateUsername(
            Authentication auth,
            @RequestBody Map<String, String> body
    ) {
        String currentUsername = auth.getName();  // 세션 말고 JWT에서 추출
        String newUsername = body.get("newUsername");

        // 중복 확인
        if (userService.findByUsername(newUsername).isPresent()) {
            return ResponseEntity.status(409).body("이미 존재하는 아이디입니다.");
        }

        userService.updateUsername(currentUsername, newUsername);

        // 🔑 새 JWT 토큰 재발급
        String newToken = jwtUtil.generateToken(newUsername, "ROLE_USER");

        return ResponseEntity.ok(Map.of("token", newToken));
    }

    // 비밀번호 수정
    @PutMapping("/updatepassword")
    public ResponseEntity<?> updatePassword(
            Authentication auth,
            @RequestBody Map<String, String> body
    ) {
        String username = auth.getName();  // 세션X → JWT로부터 추출

        String currentPw = body.get("currentPassword");
        String newPw = body.get("newPassword");

        boolean result = userService.updatePassword(username, currentPw, newPw);
        if (!result) {
            return ResponseEntity.status(403).body("현재 비밀번호가 틀렸습니다.");
        }

        //새 토큰 재발급
        String newToken = jwtUtil.generateToken(username, "ROLE_USER");
        return ResponseEntity.ok(Map.of("token", newToken));
    }

    //관리자 계정일 경우 /admin으로 들어갈수 있는 GetMapping
    @GetMapping("/is-admin")
    public ResponseEntity<Boolean> checkAdmin(Authentication authentication) {
        if (authentication != null && authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
    }
}