package ru.msu.speccoursevmk.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RequestProcessingAPI {
    public void afterRequestUpdate () {
        log.info("After request update");
    }
}
