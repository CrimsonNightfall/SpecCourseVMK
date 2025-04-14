package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class ItemsListResponse {
    private int count;
    private List <ItemsWithNames> items;
}