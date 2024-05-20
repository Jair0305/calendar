package com.jair.calendar.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public interface S3Service {

    String uploadFile(MultipartFile multipartFile) throws IOException;
    String downloadFile(String fileName) throws IOException;
    List<String> listFiles() throws IOException;
    String deleteFile(String fileName) throws IOException;
    String renameFile(String oldFileName, String newFileName) throws IOException;
    String updateFile(MultipartFile multipartFile, String oldFileName) throws IOException;

    String getFileUrl(String fileName);
}
