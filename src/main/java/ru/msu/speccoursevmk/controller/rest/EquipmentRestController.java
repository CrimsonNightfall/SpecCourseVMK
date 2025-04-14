package ru.msu.speccoursevmk.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ru.msu.speccoursevmk.api.EquipmentAPI;
import ru.msu.speccoursevmk.e.*;

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

    @GetMapping("/list-of-nomenclatures")
    public ResponseEntity<List<Nomenclature>> getListOfNomenclatures() {
        String sSQL = "SELECT * FROM rubr_item_nomenclatures ORDER BY id ASC";
//        String sSQLcount = "SELECT count(*) as count from rubr_item_nomenclatures";
//        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> maps = template.queryForList(sSQL);
        var nomenclatures = new ArrayList<Nomenclature>();
        maps.forEach(entity -> {
            var curEntity = new Nomenclature();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curName = entity.get("name");
            curEntity.setName(String.valueOf(curName));
            var curCreateTime = (Timestamp) entity.get("create_time");
            curEntity.setCreateTime(curCreateTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            nomenclatures.add(curEntity);
        });
//        var nomenclatureListResponse = new NomenclatureListResponse();
//        nomenclatureListResponse.setNomenclatures(nomenclatures);
//        nomenclatureListResponse.setCount(count);
        return ResponseEntity.ok(nomenclatures);
    }

    @GetMapping("/list")
    public ResponseEntity<ItemsListResponse> getList(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @RequestParam(value = "displayLimit", required = false, defaultValue = "10") int displayLimit) {
//        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        String sSQL = "SELECT obj_items.*, rubr_item_nomenclatures.name as nomenclatureName\n" +
                "FROM obj_items\n" +
                "LEFT JOIN rubr_item_nomenclatures\n" +
                "ON obj_items.nomenclature_name_id = rubr_item_nomenclatures.id" +
                " ORDER BY id ASC OFFSET ? LIMIT ?";
        String sSQLcount = "SELECT count(*) as count from obj_items";
        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> maps = template.queryForList(sSQL, (page - 1) * displayLimit, displayLimit);
        var items = new ArrayList<ItemsWithNames>();
        maps.forEach(entity -> {
            var curEntity = new ItemsWithNames();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curNomIdColumnRowValue = (int) entity.get("nomenclature_name_id");
            curEntity.setNomenclatureId(curNomIdColumnRowValue);
            var curCount = (int) entity.get("quantity");
            curEntity.setCount(curCount);
            var curCreateUserId = (int) entity.get("create_user_id");
            curEntity.setCreateUserId(curCreateUserId);
            var curBatchName = entity.get("batch_name");
            curEntity.setBatchName(String.valueOf(curBatchName));
            var curCreateTime = (Timestamp) entity.get("create_time");
            curEntity.setCreateTime(curCreateTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            var curNomName = entity.get("nomenclatureName");
            curEntity.setNomenclatureName(String.valueOf(curNomName));
            items.add(curEntity);
        });
        var itemsListResponse = new ItemsListResponse();
        itemsListResponse.setItems(items);
        itemsListResponse.setCount(count);
        return ResponseEntity.ok(itemsListResponse);
    }

    @GetMapping("/nomenclatures")
    public ResponseEntity<NomenclatureListResponse> getNomenclatures(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @RequestParam(value = "displayLimit", required = false, defaultValue = "10") int displayLimit) {
        String sSQL = "SELECT * FROM rubr_item_nomenclatures ORDER BY id ASC OFFSET ? LIMIT ?";
        String sSQLcount = "SELECT count(*) as count from rubr_item_nomenclatures";
        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> maps = template.queryForList(sSQL, (page - 1) * displayLimit, displayLimit);
        var nomenclatures = new ArrayList<Nomenclature>();
        maps.forEach(entity -> {
            var curEntity = new Nomenclature();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curName = entity.get("name");
            curEntity.setName(String.valueOf(curName));
            var curCreateTime = (Timestamp) entity.get("create_time");
            curEntity.setCreateTime(curCreateTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            nomenclatures.add(curEntity);
        });
        var nomenclatureListResponse = new NomenclatureListResponse();
        nomenclatureListResponse.setNomenclatures(nomenclatures);
        nomenclatureListResponse.setCount(count);
        return ResponseEntity.ok(nomenclatureListResponse);
    }

    @PutMapping("/add-nomenclature")
    public ResponseEntity<Void> addNomenclature(@RequestBody Nomenclature nomenclature) {
        String sSQL = "INSERT INTO rubr_item_nomenclatures (name) VALUES (?)";
        template.update(sSQL, nomenclature.getName());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/add-item")
    public ResponseEntity<Void> addItems(@RequestBody ItemsWithNames items) {
        String sSQLGetId = "SELECT id FROM rubr_item_nomenclatures WHERE name = ?";
        //template.update(sSQLGetId, items.getNomenclatureName());
        Integer nomId = template.queryForObject(sSQLGetId, Integer.class, items.getNomenclatureName());
        String sSQL = "INSERT INTO obj_items (nomenclature_name_id, quantity, create_user_id, batch_name) VALUES (?, ?, ?, ?)";
        template.update(sSQL, nomId, items.getCount(), 1, items.getBatchName());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> edit(@RequestBody ItemsWithNames items) {
        Date now = Date.from(Instant.now());
        String sSQLGetId = "SELECT id FROM rubr_item_nomenclatures WHERE name = ?";
        Integer nomId = template.queryForObject(sSQLGetId, Integer.class, items.getNomenclatureName());
        String sSQL = "UPDATE obj_items SET nomenclature_name_id = ?, update_time = ? WHERE id = ?";
        template.update(sSQL, nomId, now, items.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit-count")
    public ResponseEntity<Void> editCount(@RequestBody ItemsWithNames items) {
        Date now = Date.from(Instant.now());
        String sSQL = "UPDATE obj_items SET quantity = ?, update_time = ? WHERE id = ?";
        template.update(sSQL, items.getCount(), now, items.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit-batch-name")
    public ResponseEntity<Void> editBatchName(@RequestBody ItemsWithNames items) {
        Date now = Date.from(Instant.now());
        String sSQL = "UPDATE obj_items SET batch_name = ?, update_time = ? WHERE id = ?";
        template.update(sSQL, items.getBatchName(), now, items.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit-nomenclature")
    public ResponseEntity<Void> editNomenclature(@RequestBody Nomenclature nomenclature) {
        Date now = Date.from(Instant.now());
        String sSQL = "UPDATE rubr_item_nomenclatures SET name = ?, update_time = ? WHERE id = ?";
        template.update(sSQL, nomenclature.getName(), now, nomenclature.getId());
        return ResponseEntity.ok().build();
    }
}
