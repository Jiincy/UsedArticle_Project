package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    void insertUser(User user);

    User findByLoginIdAndPassword(@Param("userId") String userId, @Param("userPw") String userPw);

    User findById(@Param("userId") String userId);  // 수정된 부분

    void updateUser(User user);

    void deleteUser(@Param("userId") String userId);

    List<User> searchUsers(@Param("keyword") String keyword);
}

