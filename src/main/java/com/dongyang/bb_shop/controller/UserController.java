package com.dongyang.bb_shop.controller;

import com.dongyang.bb_shop.dto.UserDto;
import com.dongyang.bb_shop.service.UserService;
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
    public ResponseEntity<Boolean> login(@RequestBody UserDto dto) {
        boolean result = userService.login(dto.getUsername(), dto.getPassword());
        return ResponseEntity.ok(result);
    }
}