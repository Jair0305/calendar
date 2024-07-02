package com.jair.calendar;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

public class Main {

    public static void main(String[] args) throws Exception {
        URL url = new URL("https://calendar-jair0305.s3.us-east-2.amazonaws.com/yo.jpg");
        InputStream is = url.openStream();
        BufferedImage image = ImageIO.read(is);
        int color = getDominantColor(image);
        System.out.println("Red: " + (color >> 16 & 0xFF));
        System.out.println("Green: " + (color >> 8 & 0xFF));
        System.out.println("Blue: " + (color & 0xFF));
    }

    public static int getDominantColor(BufferedImage image) {
        Map<Integer, Integer> colorMap = new HashMap<>();

        for (int x = 0; x < image.getWidth(); x++) {
            for (int y = 0; y < image.getHeight(); y++) {
                int rgb = image.getRGB(x, y);
                colorMap.put(rgb, colorMap.getOrDefault(rgb, 0) + 1);
            }
        }

        return colorMap.entrySet().stream().max(Map.Entry.comparingByValue()).get().getKey();
    }
}
