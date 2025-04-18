package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class RequestWithNames {
    private int id;
    private int nomenclatureId;
    private int statusId;
    private int quantity;
    private int createUserId;
    private Instant registrationTime;
    private Instant updateTime;
    private Instant completionTime;
    private String userName;
    private String nomenclatureName;
    private String statusName;
}
