package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class Request {
    private int id;
    private int nomenclatureId;
    private int count;
    private int userId;
    private int statusId;
    private Instant registrationTime;
    private Instant updateTime;
    private Instant completionTime;
}
