package com.sky.usedarticle.service;

import com.sky.usedarticle.dto.User;
import com.sky.usedarticle.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    public void signUp(User user) {
        userMapper.insertUser(user);
    }

    public User login(String userId, String userPw) {
        return userMapper.findByLoginIdAndPassword(userId, userPw);
    }

}
