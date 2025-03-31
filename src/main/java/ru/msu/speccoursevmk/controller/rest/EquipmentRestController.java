package ru.msu.speccoursevmk.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ru.msu.speccoursevmk.api.EquipmentAPI;
import ru.msu.speccoursevmk.e.Items;
import ru.msu.speccoursevmk.e.NomencaltureListResponse;
import ru.msu.speccoursevmk.e.Nomenclature;

import javax.sql.DataSource;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/equipment")
@RequiredArgsConstructor
public class EquipmentRestController {
    private final EquipmentAPI equipmentAPI;
    private final DataSource dataSource;

    @Autowired JdbcTemplate template;

    @GetMapping("/list")
    public ResponseEntity<List<Items>> getList() {
//        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        String sSQL = "SELECT * FROM obj_items";
        List<Map<String, Object>> maps = template.queryForList(sSQL);
        var items = new ArrayList<Items>();
        maps.forEach(entity -> {
            var curEntity = new Items();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curNomIdColumnRowValue = (int) entity.get("nomenclature_name_id");
            curEntity.setNomenclatureId(curNomIdColumnRowValue);
            var curCount = (int) entity.get("quantity");
            curEntity.setCount(curCount);
            items.add(curEntity);
        });
        return ResponseEntity.ok(items);
    }

    @GetMapping("/nomenclatures")
    public ResponseEntity<NomencaltureListResponse> getNomenclatures(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @RequestParam(value = "displayLimit", required = false, defaultValue = "10") int displayLimit) {
//        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        String sSQL = "SELECT * FROM rubr_item_nomenclatures ORDER BY id ASC OFFSET ? LIMIT ?";
        String sSQLcount = "SELECT count(*) as count from rubr_item_nomenclatures";
        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> maps = template.queryForList(sSQL, (page - 1) * displayLimit, displayLimit);
//        String sSQL = "SELECT * FROM rubr_item_nomenclatures ORDER BY id ASC OFFSET ? LIMIT ?";
//        List<Map<String, Object>> maps = template.queryForList(sSQL, (page - 1) * displayLimit, displayLimit);
//        List<Map<String, Object>> maps = template.queryForList(sSQL);
        var nomenclatures = new ArrayList<Nomenclature>();
        maps.forEach(entity -> {
            var curEntity = new Nomenclature();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curCount = entity.get("name");
            curEntity.setName(String.valueOf(curCount));
            var curCreateTime = (Timestamp) entity.get("create_time");
            curEntity.setCreateTime(curCreateTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            nomenclatures.add(curEntity);
        });
        var nomenclatureListResponse = new NomencaltureListResponse();
        nomenclatureListResponse.setNomenclatures(nomenclatures);
        nomenclatureListResponse.setCount(count);
        return ResponseEntity.ok(nomenclatureListResponse);
    }

    @PutMapping("/add-nomenclature")
    public ResponseEntity<Void> addNomenclature(@RequestBody Nomenclature nomenclature) {
//        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        String sSQL = "INSERT INTO rubr_item_nomenclatures (name) VALUES (?)";
        template.update(sSQL, nomenclature.getName());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> edit(@RequestBody Items items) {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();

    }

    @PutMapping("/edit-nomenclature")
    public ResponseEntity<Void> editNomenclature(@RequestBody Nomenclature nomenclature) {
        Date now = Date.from(Instant.now());
        String sSQL = "UPDATE rubr_item_nomenclatures SET name = ?, update_time = ? WHERE id = ?";
        template.update(sSQL, nomenclature.getName(), now, nomenclature.getId());
        return ResponseEntity.ok().build();
    }
}
