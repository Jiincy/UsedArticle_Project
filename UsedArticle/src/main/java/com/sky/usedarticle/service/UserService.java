package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public void signUp(User user) {
        userMapper.insertUser(user);
    }

//    public boolean login(User user) {
//        int count = userMapper.checkLogin(user.getUserId(), user.getUserPw());
//        return count == 1; // 로그인 성공 여부를 true/false로 반환
//    }

    public User login(String userId, String userPw) {
        return userMapper.checkLogin(userId, userPw);
    }
}
