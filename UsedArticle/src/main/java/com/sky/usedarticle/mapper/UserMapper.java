package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    void insertUser(@Param("user") User user);

    User findByLoginIdAndPassword(@Param("userId") String userId, @Param("userPw") String userPw);
}
