package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public void signUp(User user) {
        userMapper.insertUser(user);
    }

    public User login(String userId, String userPw) {
        return userMapper.findByLoginIdAndPassword(userId, userPw);
    }

    public User updateUser(User user) {
        userMapper.updateUser(user);
        return userMapper.findById(user.getUserId());  // 수정된 부분
    }

    public void deleteUser(String userId) {
        try {
            System.out.println("Deleting user with ID: " + userId); // 디버깅 메시지 추가
            userMapper.deleteUser(userId);
            System.out.println("User deleted successfully."); // 디버깅 메시지 추가
        } catch (Exception e) {
            // 디버깅 메시지 추가
            System.err.println("데이터베이스에서 사용자 삭제 중 오류 발생: " + e.getMessage());
            e.printStackTrace();  // 스택 추적 출력
            throw e;
        }
    }

}

