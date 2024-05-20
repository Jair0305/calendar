package com.jair.calendar.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${aws.access_key_id}")
    private String accesKey;

    @Value("${aws.secret_access_key}")
    private String secretKey;

    @Bean
    public S3Client s3Client()
    {
        Region region = Region.US_EAST_2;
        AwsCredentials credentials = AwsBasicCredentials.create(accesKey, secretKey);

        S3Client s3Client = S3Client.builder()
                .region(region)
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();

        return s3Client;
    }
}
