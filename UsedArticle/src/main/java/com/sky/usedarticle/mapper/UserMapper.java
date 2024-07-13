package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    void insertUser(User user);

    User findByLoginIdAndPassword(@Param("userId") String userId, @Param("userPw") String userPw);

    User findById(@Param("id") String id);

    void updateUser(User user);

    void deleteUser(@Param("id") String id);
}
