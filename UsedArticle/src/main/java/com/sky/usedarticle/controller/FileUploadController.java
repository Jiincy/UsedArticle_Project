package com.sky.usedarticle.controller;

import com.sky.usedarticle.dto.FileDto;
import com.sky.usedarticle.mapper.FileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Autowired
    private FileMapper fileMapper;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file,
                             @RequestParam("productId") String productId) {

        // 파일 저장 경로 설정
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                e.printStackTrace();
                return "파일 업로드 실패: 디렉토리 생성 오류";
            }
        }

        // 파일 저장
        String fileId = UUID.randomUUID().toString();
        String fileName = file.getOriginalFilename();
        String filePath = UPLOAD_DIR + fileId + "_" + fileName;

        try {
            file.transferTo(new File(filePath));

            // 파일 정보 데이터베이스에 저장
            FileDto fileDTO = new FileDto();
            fileDTO.setFileId(fileId);
            fileDTO.setFileName(fileName);
            fileDTO.setProductId(productId);

            fileMapper.insertFile(fileDTO);

            return "파일 업로드 성공";
        } catch (IOException e) {
            e.printStackTrace();
            return "파일 업로드 실패";
        }
    }
}
