package ru.msu.speccoursevmk.e;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class Nomenclature {
    private int id;
    private String name;
    private Instant createTime;
    private Instant updateTime;
}
