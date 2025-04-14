package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class ItemsWithNames {
    private int id;
    private int nomenclatureId;
    private int count;
    private int createUserId;
    private String batchName;
    private Instant createTime;
    private Instant updateTime;
    private String nomenclatureName;
}