package ru.msu.speccoursevmk.controller.rest;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ru.msu.speccoursevmk.api.RequestAPI;
import ru.msu.speccoursevmk.api.RequestProcessingAPI;
import ru.msu.speccoursevmk.e.*;

import javax.sql.DataSource;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/requests")
@RequiredArgsConstructor
public class RequestRestController {
    private final RequestAPI requestAPI;
    private final DataSource dataSource;

    @Autowired JdbcTemplate template;

    @Autowired
    RequestProcessingAPI requestProcessingAPI;

    @GetMapping("/list-of-users")
    public ResponseEntity<List<User>> getListOfUsers() {
        String sSQL = "SELECT * FROM obj_users ORDER BY id ASC";
        List<Map<String, Object>> maps = template.queryForList(sSQL);
        var users = new ArrayList<User>();
        maps.forEach(entity -> {
            var curEntity = new User();
            var curIdValue = (int) entity.get("id");
            curEntity.setId(curIdValue);
            var curLogin = entity.get("login");
            curEntity.setName(String.valueOf(curLogin));
            var curName = entity.get("full_name");
            curEntity.setName(String.valueOf(curName));
            var curRoleValue = (int) entity.get("role_id");
            curEntity.setRoleId(curRoleValue);
            var curCreateTime = (Timestamp) entity.get("create_time");
            curEntity.setCreateTime(curCreateTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            users.add(curEntity);
        });
        return ResponseEntity.ok(users);
    }

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

    @GetMapping("/list-of-statuses")
    public ResponseEntity<List<RequestStatus>> getListOfStatuses() {
        String sSQL = "SELECT * FROM rubr_request_statuses ORDER BY id ASC";
        List<Map<String, Object>> maps = template.queryForList(sSQL);
        var statuses = new ArrayList<RequestStatus>();
        maps.forEach(entity -> {
            var curEntity = new RequestStatus();
            var curIdValue = (int) entity.get("id");
            curEntity.setId(curIdValue);
            var curName = entity.get("name");
            curEntity.setName(String.valueOf(curName));
            statuses.add(curEntity);
        });
        return ResponseEntity.ok(statuses);
    }

    @GetMapping("/list")
    public ResponseEntity<RequestListResponse> getList(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @RequestParam(value = "displayLimit", required = false, defaultValue = "10") int displayLimit) {
//        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        String sSQL = "SELECT obj_requests.*, obj_users.full_name AS user_name, rubr_item_nomenclatures.name AS nomenclature_name, rubr_request_statuses.name AS status_name\n" +
                "FROM obj_requests\n" +
                "LEFT JOIN rubr_item_nomenclatures\n" +
                "ON obj_requests.nomenclature_name_id = rubr_item_nomenclatures.id\n" +
                "LEFT JOIN obj_users\n" +
                "ON obj_requests.create_user_id = obj_users.id\n" +
                "LEFT JOIN rubr_request_statuses\n" +
                "ON obj_requests.status_id = rubr_request_statuses.id\n" +
                "ORDER BY id DESC OFFSET ? LIMIT ?";
        String sSQLcount = "SELECT count(*) as count from obj_requests";
        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> maps = template.queryForList(sSQL, (page - 1) * displayLimit, displayLimit);
        var requests = new ArrayList<RequestWithNames>();
        maps.forEach(entity -> {
            var curEntity = new RequestWithNames();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curNomIdValue = (int) entity.get("nomenclature_name_id");
            curEntity.setNomenclatureId(curNomIdValue);
            var curStatusIdValue = (int) entity.get("status_id");
            curEntity.setStatusId(curStatusIdValue);
            var curQuantity = (int) entity.get("quantity");
            curEntity.setQuantity(curQuantity);
            var curCreateUserIdValue = (int) entity.get("create_user_id");
            curEntity.setCreateUserId(curCreateUserIdValue);
            var curRegistrationTime = (Timestamp) entity.get("registration_time");
            curEntity.setRegistrationTime(curRegistrationTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            var curCompletionTime = (Timestamp) entity.get("completion_time");
            if (curCompletionTime != null) {
                curEntity.setCompletionTime(curCompletionTime.toInstant());
            }
            var curUserName = entity.get("user_name");
            curEntity.setUserName(String.valueOf(curUserName));
            var curNomName = entity.get("nomenclature_name");
            curEntity.setNomenclatureName(String.valueOf(curNomName));
            var curStatusName = entity.get("status_name");
            curEntity.setStatusName(String.valueOf(curStatusName));
            requests.add(curEntity);
        });
        var requestListResponse = new RequestListResponse();
        requestListResponse.setRequests(requests);
        requestListResponse.setCount(count);
        requestProcessingAPI.afterRequestUpdate();
        return ResponseEntity.ok(requestListResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestWithNames> getRequest(@PathVariable(value = "id") int iD) {
//        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        String sSQL = "SELECT obj_requests.*, obj_users.full_name AS user_name, rubr_item_nomenclatures.name AS nomenclature_name, rubr_request_statuses.name AS status_name\n" +
                "FROM obj_requests\n" +
                "LEFT JOIN rubr_item_nomenclatures\n" +
                "ON obj_requests.nomenclature_name_id = rubr_item_nomenclatures.id\n" +
                "LEFT JOIN obj_users\n" +
                "ON obj_requests.create_user_id = obj_users.id\n" +
                "LEFT JOIN rubr_request_statuses\n" +
                "ON obj_requests.status_id = rubr_request_statuses.id\n" +
                "WHERE obj_requests.id = ?";
        Map<String, Object> entityMap = template.queryForMap(sSQL, iD);
        RequestWithNames request = new RequestWithNames();
        request.setId((int) entityMap.get("id"));
        request.setNomenclatureId((int) entityMap.get("nomenclature_name_id"));
        request.setStatusId((int) entityMap.get("status_id"));
        request.setQuantity((int) entityMap.get("quantity"));
        request.setCreateUserId((int) entityMap.get("create_user_id"));
        request.setRegistrationTime(((Timestamp) entityMap.get("registration_time")).toInstant());
        request.setUpdateTime(((Timestamp) entityMap.get("update_time")).toInstant());
        var curCompletionTime = (Timestamp) entityMap.get("completion_time");
        if (curCompletionTime != null) {
            request.setCompletionTime(curCompletionTime.toInstant());
        }
        request.setUserName((String) entityMap.get("user_name"));
        request.setNomenclatureName((String) entityMap.get("nomenclature_name"));
        request.setStatusName((String) entityMap.get("status_name"));
        return ResponseEntity.ok(request);
    }

    @PutMapping("/add")
    public ResponseEntity<Void> add(@RequestBody RequestWithNames request) {
//        String sSQLGetId = "SELECT id FROM rubr_item_nomenclatures WHERE name = ?";
//        Integer nomId = template.queryForObject(sSQLGetId, Integer.class, request.getNomenclatureName());
//        String sSQLGetUserId = "SELECT id FROM obj_users WHERE name = ?";
//        Integer userId = template.queryForObject(sSQLGetUserId, Integer.class, request.getUserName());
        String sSQL = "INSERT INTO obj_requests (nomenclature_name_id, quantity, create_user_id, status_id) VALUES (?, ?, ?, ?)";
        template.update(sSQL, request.getNomenclatureId(), request.getQuantity(), request.getCreateUserId(), 3);
        requestProcessingAPI.afterRequestUpdate();
        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit")
    public ResponseEntity<Void> edit(@RequestBody RequestWithNames request) {
        Date now = Date.from(Instant.now());
//        String sSQLGetId = "SELECT id FROM rubr_item_nomenclatures WHERE name = ?";
//        Integer nomId = template.queryForObject(sSQLGetId, Integer.class, items.getNomenclatureName());
        String sSQL = "UPDATE obj_requests SET nomenclature_name_id = ?, quantity = ?, update_time = ? WHERE id = ?";
        template.update(sSQL, request.getNomenclatureId(), request.getQuantity(), now, request.getId());
        requestProcessingAPI.afterRequestUpdate();
        return ResponseEntity.ok().build();
    }
}
