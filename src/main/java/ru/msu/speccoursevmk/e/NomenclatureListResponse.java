package ru.msu.speccoursevmk.e;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class NomenclatureListResponse {
    private int count;
    private List <Nomenclature> nomenclatures;
}
