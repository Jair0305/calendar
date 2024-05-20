package com.jair.calendar.controllers;

import com.jair.calendar.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/s3")
public class S3Controller {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
        return s3Service.uploadFile(file);
    }

    @GetMapping("/download/{fileName}")
    public String downloadFile(@PathVariable String fileName) throws IOException {
        return s3Service.downloadFile(fileName);
    }

    @GetMapping("/list")
    public List<String> listFiles() throws IOException {
        return s3Service.listFiles();
    }

    @DeleteMapping("/delete/{fileName}")
    public String deleteFile(@PathVariable String fileName) throws IOException {
        return s3Service.deleteFile(fileName);
    }

    @PutMapping("/rename/{oldFileName}/{newFileName}")
    public String renameFile(@PathVariable("oldFileName") String oldFileName, @PathVariable("newFileName") String newFileName) throws IOException {
        return s3Service.renameFile(oldFileName, newFileName);
    }
    @PutMapping("/update/{oldFileName}")
    public String updateFile(@RequestParam("file")MultipartFile file, @PathVariable("oldFileName") String oldFileName) throws IOException {
        return s3Service.updateFile(file, oldFileName);
    }
}
