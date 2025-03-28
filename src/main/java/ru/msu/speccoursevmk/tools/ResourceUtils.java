package ru.msu.speccoursevmk.tools;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

/**
 * Набор методов для работы с ресурсами в classpath
 */
@Slf4j
public class ResourceUtils {

    /**
     * @param resourceUrl Путь к ресурсу в classpath
     * @return unix-time millis последней модификации ресурса или времени последнего деплоя в случае ошибки
     */
    public static long getLastModified(String resourceUrl) {
        long version;
        try {
            version = new ClassPathResource(resourceUrl).lastModified();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
            version = System.currentTimeMillis();
        }
        return version;
    }

    /**
     * @param resourceUrl Путь к ресурсу в classpath
     * @return содержимое ресурса по переданному url
     */
    public static String getStringContent(String resourceUrl) throws IOException {
        try (InputStream inputStream = new ClassPathResource(resourceUrl).getInputStream()) {
            return new String(inputStream.readAllBytes());
        }
    }
}
