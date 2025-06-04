package com.dongyang.bb_shop.controller;

import com.dongyang.bb_shop.dto.UserDto;
import com.dongyang.bb_shop.entity.UserEntity;
import com.dongyang.bb_shop.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

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
            session.setAttribute("loginUser", dto.getUsername());
            Optional<UserEntity> user = userService.findByUsername(dto.getUsername());
            user.ifPresent(u -> {
                session.setAttribute("loginUserId", u.getId());
                System.out.println("🧑 로그인된 사용자 ID: " + u.getId()); // ✅ 여기!
            });

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


    //내정보 페이지에서 로그인된 유저의 정보를 보여주는 GetMapping
    @GetMapping("/me")
    public ResponseEntity<UserDto> getUserInfo(HttpSession session) {
        String username = (String) session.getAttribute("loginUser");
        if (username == null) {
            return ResponseEntity.status(401).build();  // 로그인 안됨
        }

        Optional<UserEntity> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        UserEntity user = userOpt.get();
        UserDto dto = new UserDto();
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());

        return ResponseEntity.ok(dto);
    }

    // 아이디 수정
    @PutMapping("/updateusername")
    public ResponseEntity<?> updateUsername(
            HttpSession session,
            @RequestBody Map<String, String> body
    ) {
        String currentUsername = (String) session.getAttribute("loginUser");
        if (currentUsername == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        String newUsername = body.get("newUsername");

        // 중복 확인
        if (userService.findByUsername(newUsername).isPresent()) {
            return ResponseEntity.status(409).body("이미 존재하는 아이디입니다.");
        }

        userService.updateUsername(currentUsername, newUsername);
        session.setAttribute("loginUser", newUsername); // 세션 업데이트
        return ResponseEntity.ok("아이디가 수정되었습니다.");
    }

    // 비밀번호 수정
    @PutMapping("/updatepassword")
    public ResponseEntity<?> updatePassword(
            HttpSession session,
            @RequestBody Map<String, String> body
    ) {
        String username = (String) session.getAttribute("loginUser");
        if (username == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        String currentPw = body.get("currentPassword");
        String newPw = body.get("newPassword");

        boolean result = userService.updatePassword(username, currentPw, newPw);
        if (!result) {
            return ResponseEntity.status(403).body("현재 비밀번호가 틀렸습니다.");
        }

        return ResponseEntity.ok("비밀번호가 수정되었습니다.");
    }
}