package com.dongyang.bb_shop.dto;

import com.dongyang.bb_shop.entity.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private String username;
    private String password;
    private String email;

    // UserEntity로부터 값을 복사하는 생성자
    public UserDto(UserEntity user) {
        this.username = user.getUsername();
        this.password = user.getPassword(); // 비밀번호는 보통 제외하지만 필요하다면 포함
        this.email = user.getEmail();
    }
}


