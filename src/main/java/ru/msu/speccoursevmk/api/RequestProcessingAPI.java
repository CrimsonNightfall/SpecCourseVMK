package ru.msu.speccoursevmk.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import ru.msu.speccoursevmk.e.ItemsWithNames;
import ru.msu.speccoursevmk.e.RequestWithNames;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RequestProcessingAPI {

    @Autowired
    JdbcTemplate template;

    public void afterRequestUpdate () {
        log.info("After request update");
        String sSQLListRequest = "SELECT obj_requests.*, obj_users.full_name AS user_name, rubr_item_nomenclatures.name AS nomenclature_name, rubr_request_statuses.name AS status_name\n" +
                "FROM obj_requests\n" +
                "LEFT JOIN rubr_item_nomenclatures\n" +
                "ON obj_requests.nomenclature_name_id = rubr_item_nomenclatures.id\n" +
                "LEFT JOIN obj_users\n" +
                "ON obj_requests.create_user_id = obj_users.id\n" +
                "LEFT JOIN rubr_request_statuses\n" +
                "ON obj_requests.status_id = rubr_request_statuses.id\n" +
                "where obj_requests.status_id in (1, 3) \n" +
                " ORDER BY id ASC";
//        String sSQLcount = "SELECT count(*) as count from obj_requests";
//        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> mapsRequest = template.queryForList(sSQLListRequest);
        var requests = new ArrayList<RequestWithNames>();
        mapsRequest.forEach(entity -> {
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
        String sSQLListItems = "SELECT obj_items.*, rubr_item_nomenclatures.name AS nomenclatureName, obj_users.full_name AS userName\n" +
                "FROM obj_items\n" +
                "LEFT JOIN rubr_item_nomenclatures\n" +
                "ON obj_items.nomenclature_name_id = rubr_item_nomenclatures.id\n" +
                "LEFT JOIN obj_users\n" +
                "ON obj_items.create_user_id = obj_users.id\n" +
                " ORDER BY id ASC";
//        String sSQLcount = "SELECT count(*) as count from obj_items";
//        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> mapsItems = template.queryForList(sSQLListItems);
        var items = new ArrayList<ItemsWithNames>();
        mapsItems.forEach(entity -> {
            var curEntity = new ItemsWithNames();
            var curIdColumnRowValue = (int) entity.get("id");
            curEntity.setId(curIdColumnRowValue);
            var curNomIdColumnRowValue = (int) entity.get("nomenclature_name_id");
            curEntity.setNomenclatureId(curNomIdColumnRowValue);
            var curCount = (int) entity.get("quantity");
            curEntity.setCount(curCount);
            var curCreateUserId = (int) entity.get("create_user_id");
            curEntity.setCreateUserId(curCreateUserId);
            var curUserName = entity.get("userName");
            curEntity.setUserName(String.valueOf(curUserName));
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
        for (RequestWithNames entity : requests) {
            var id = entity.getId();
            var nomId = entity.getNomenclatureId();
            var requestedQ = entity.getQuantity();
            var remaining = requestedQ;
            List<ItemsWithNames> matchingItems = items.stream().filter(ex -> ex.getNomenclatureId() == nomId).collect(Collectors.toList());
            var changedItems = new ArrayList<ItemsWithNames>();
            for (ItemsWithNames item : matchingItems) {
                int available = item.getCount();
                int taken = Math.min(available, requestedQ);
                item.setCount(available - taken);

                changedItems.add(item);

                requestedQ -= taken;
                if (requestedQ <= 0) {
                    break;
                }
            }
            Date now = Date.from(Instant.now());
            if (requestedQ < remaining) {
                String sSQLForUpdateReq = "UPDATE obj_requests SET status_id = ?, update_time = ? WHERE id = ?";
                template.update(sSQLForUpdateReq, 1, now, id);
            }
            if (requestedQ <= 0) {
                for (ItemsWithNames item : changedItems) {
                    String sSQLForUpdateItem = "UPDATE obj_items SET quantity = ?, update_time = ? WHERE id = ?";
                    template.update(sSQLForUpdateItem, item.getCount(), now, item.getId());
                }
                String sSQLForUpdateReq = "UPDATE obj_requests SET status_id = ?, update_time = ?, completion_time = ? WHERE id = ?";
                template.update(sSQLForUpdateReq, 2, now, now, id);
            }
        }
    }
}
