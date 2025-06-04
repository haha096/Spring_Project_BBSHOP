package com.dongyang.bb_shop.service;

import com.dongyang.bb_shop.dto.UserDto;
import com.dongyang.bb_shop.entity.UserEntity;
import com.dongyang.bb_shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(UserDto dto) {
        UserEntity user = new UserEntity();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());

        userRepository.save(user);
    }

    public boolean login(String username, String rawPassword) {
        return userRepository.findByUsername(username)
                .map(user -> rawPassword.equals(user.getPassword()))  // 평문 비교
                .orElse(false);
    }

    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    //아이디 수정
    public void updateUsername(String currentUsername, String newUsername) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(currentUsername);
        userOpt.ifPresent(user -> {
            user.setUsername(newUsername);
            userRepository.save(user);
        });
    }

    //비밀번호 수정
    public boolean updatePassword(String username, String currentPw, String newPw) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) return false;
        UserEntity user = userOpt.get();

        if (!user.getPassword().equals(currentPw)) {
            return false;
        }

        user.setPassword(newPw);
        userRepository.save(user);
        return true;
    }
}
