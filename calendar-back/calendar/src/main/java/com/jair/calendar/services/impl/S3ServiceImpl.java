package com.jair.calendar.services.impl;

import com.jair.calendar.services.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class S3ServiceImpl implements S3Service {

    private final String localPath;

    private final S3Client s3Client;

    @Autowired
    public S3ServiceImpl(S3Client s3Client) {
        this.s3Client = s3Client;
        this.localPath = System.getProperty("user.home") + "/Downloads/";
    }

    public  String uploadFile(MultipartFile multipartFile) throws IOException
    {
        try {
            String fileName = multipartFile.getOriginalFilename();

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket("calendar-jair0305")
                    .key(fileName)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));

            return "File uploaded";

        }catch (IOException e) {
            throw new IOException("Error uploading file");

        }
    }

    public String downloadFile(String fileName) throws IOException {

        if(!doesObjectExists(fileName)) {
            throw new IllegalArgumentException("El archivo no existe");
        }

        GetObjectRequest request = GetObjectRequest.builder()
                .bucket("calendar-jair0305")
                .key(fileName)
                .build();

        ResponseInputStream<GetObjectResponse> result = s3Client.getObject(request);
        try(FileOutputStream fileOutputStream = new FileOutputStream(localPath + fileName)){
            byte[] buffer = new byte[1024];
            int bytesRead;
            while((bytesRead = result.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, bytesRead);
            }

        }catch (IOException e) {
            throw new IOException(e.getMessage());
        }
        return "file downloaded";
    }

    public List<String> listFiles() throws IOException {
        try {

            ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                    .bucket("calendar-jair0305")
                    .build();

            List<S3Object> objects = s3Client.listObjects(listObjectsRequest).contents();
            List<String> fileNames = new ArrayList<>();
            for(S3Object object : objects) {
                fileNames.add(object.key());
            }
            return fileNames;

        }catch (S3Exception e)
        {
            throw new IOException("Error listing files");
        }
    }

    public String deleteFile(String fileName) throws IOException {
        if(!doesObjectExists(fileName)) {
            throw new IllegalArgumentException("El archivo no existe");
        }

        try{
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket("calendar-jair0305")
                    .key(fileName)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
            return "File deleted";

        }catch (S3Exception e) {
            throw new IOException("Error deleting file");
        }
    }

    public String renameFile(String oldFileName, String newFileName) throws IOException
    {
        if(!doesObjectExists(oldFileName)) {
            throw new IllegalArgumentException("El archivo no existe");
        }

        try {
            CopyObjectRequest copyObjectRequest = CopyObjectRequest.builder()
                    .copySource("calendar-jair0305/" + oldFileName)
                    .destinationBucket("calendar-jair0305")
                    .destinationKey(newFileName)
                    .build();
            s3Client.copyObject(copyObjectRequest);
            deleteFile(oldFileName);
            return "File renamed";
        }catch (S3Exception e) {
            throw new IllegalArgumentException("Error renaming file");
        }
    }

    public String updateFile(MultipartFile multipartFile, String oldFileName) throws IOException
    {
        if(!doesObjectExists(oldFileName)) {
            throw new IllegalArgumentException("El archivo no existe");
        }
        try
        {
            String newFileName = multipartFile.getOriginalFilename();
            deleteFile(oldFileName);

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket("calendar-jair0305")
                    .key(newFileName)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(multipartFile.getBytes()));
            return "File updated";

        }catch (S3Exception e) {
            throw new IOException("Error updating file");
        }
    }

    @Override
    public String getFileUrl(String fileName) {
        return s3Client.utilities().getUrl(builder -> builder.bucket("calendar-jair0305").key(fileName)).toExternalForm();
    }

    private boolean doesObjectExists(String objectKey) {
        try {
            HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                    .bucket("calendar-jair0305")
                    .key(objectKey)
                    .build();
            s3Client.headObject(headObjectRequest);
        }catch (S3Exception e) {
            if(e.statusCode() == 404) {
                return false;
            }
        }
        return true;
    }
}
