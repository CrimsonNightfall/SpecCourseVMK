package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class User {
    private int id;
    private String login;
    private String name;
    private int roleId;
    private String roleName;
    private Instant createTime;
    private Instant updateTime;
}
