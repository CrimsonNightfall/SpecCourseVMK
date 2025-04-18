package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class RequestListResponse {
    private int count;
    private List <RequestWithNames> requests;
}