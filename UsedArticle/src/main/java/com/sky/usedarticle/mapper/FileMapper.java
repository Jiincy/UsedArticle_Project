package com.sky.usedarticle.mapper;

import com.sky.usedarticle.dto.FileDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
    void insertFile(FileDto fileDto);
}
