package com.sky.usedarticle.service;

import com.sky.usedarticle.mapper.FileMapper;
import com.sky.usedarticle.dto.FileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService {
    @Autowired
    private FileMapper fileMapper;

    public void addFile(FileDto fileDto) {
        fileMapper.insertFile(fileDto);
    }
}
