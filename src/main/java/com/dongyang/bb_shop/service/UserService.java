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
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // 암호화 저장
        user.setEmail(dto.getEmail());

        userRepository.save(user);
    }

    public Optional<UserEntity> authenticate(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }

    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void updateUsername(String currentUsername, String newUsername) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(currentUsername);
        userOpt.ifPresent(user -> {
            user.setUsername(newUsername);
            userRepository.save(user);
        });
    }

    public boolean updatePassword(String username, String currentPw, String newPw) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) return false;
        UserEntity user = userOpt.get();

        if (!passwordEncoder.matches(currentPw, user.getPassword())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(newPw)); // 새 비번 암호화
        userRepository.save(user);
        return true;
    }
}
