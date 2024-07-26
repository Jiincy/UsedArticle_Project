package com.sky.usedarticle.service;

import com.sky.usedarticle.mapper.FileMapper;
import com.sky.usedarticle.dto.FileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Autowired
    private FileMapper fileMapper;

    private final String uploadDir = "uploads/";

    public FileService() {
        // 업로드 디렉토리가 없으면 생성
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public String saveFile(MultipartFile file) throws IOException {
        // 파일 이름 변경
        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID().toString() + "_" + originalFileName;
        Path path = Paths.get(uploadDir + storedFileName);
        Files.write(path, file.getBytes());

        return storedFileName;
    }

    public void saveFileInfo(String fileId, String fileName, String productId) {
        FileDto fileDto = new FileDto();
        fileDto.setFileId(fileId);
        fileDto.setFileName(fileName);
        fileDto.setProductId(productId);

        fileMapper.insertFile(fileDto);
    }
}
