// path: com/sky/usedarticle/mapper/MessageMapper.java
package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.Message;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MessageMapper {
    void insertMessage(Message message);

    // XML에 정의된 매핑을 사용합니다.
    List<Message> findMessages(@Param("buyer") String buyer, @Param("seller") String seller, @Param("productId") String productId);
}
