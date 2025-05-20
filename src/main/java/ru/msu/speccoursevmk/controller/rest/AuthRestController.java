package ru.msu.speccoursevmk.controller.rest;


import io.swagger.annotations.ApiParam;
import jakarta.servlet.http.HttpSession;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import ru.msu.speccoursevmk.api.UserAPI;
import ru.msu.speccoursevmk.e.Nomenclature;
import ru.msu.speccoursevmk.e.RequestListResponse;
import ru.msu.speccoursevmk.e.User;
import ru.msu.speccoursevmk.e.UsersListResponse;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthRestController {
    private final static String USER_DATA_SESSION_KEY = "UserData";

    private final UserAPI userAPI;

    @Autowired
    JdbcTemplate template;

    @PostMapping("/login")
    public ResponseEntity<User> doLogin(@RequestBody LoginRequest request, HttpSession session) {
        if (!request.hasCredentials()) {
            return ResponseEntity.badRequest().build();
        }

        var user = userAPI.getUser(request.getLogin(), request.getPassword());
        if (user != null) {
            session.setAttribute(USER_DATA_SESSION_KEY, user);
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/list-of-users")
    public ResponseEntity<UsersListResponse> getUsersList(@RequestParam(value = "page", required = false, defaultValue = "1") int page, @RequestParam(value = "displayLimit", required = false, defaultValue = "10") int displayLimit) {
        String sSQL = "SELECT obj_users.*, rubr_user_roles.name AS role_name\n" +
                "FROM obj_users\n" +
                "LEFT JOIN rubr_user_roles\n" +
                "ON obj_users.role_id = rubr_user_roles.id\n" +
                " ORDER BY id DESC OFFSET ? LIMIT ?";
        String sSQLcount = "SELECT count(*) as count from obj_items";
        Integer count = template.queryForObject(sSQLcount, Integer.class);
        List<Map<String, Object>> maps = template.queryForList(sSQL, (page - 1) * displayLimit, displayLimit);
        var users = new ArrayList<User>();
        maps.forEach(entity -> {
            var curEntity = new User();
            var curIdValue = (int) entity.get("id");
            curEntity.setId(curIdValue);
            var curLogin = entity.get("login");
            curEntity.setLogin(String.valueOf(curLogin));
            var curName = entity.get("full_name");
            curEntity.setName(String.valueOf(curName));
            var curRoleValue = (int) entity.get("role_id");
            curEntity.setRoleId(curRoleValue);
            var curRoleName = entity.get("role_name");
            curEntity.setRoleName(String.valueOf(curRoleName));
            var curCreateTime = (Timestamp) entity.get("create_time");
            curEntity.setCreateTime(curCreateTime.toInstant());
            var curUpdateTime = (Timestamp) entity.get("update_time");
            curEntity.setUpdateTime(curUpdateTime.toInstant());
            users.add(curEntity);
        });
        var userListResponse = new UsersListResponse();
        userListResponse.setUsers(users);
        userListResponse.setCount(count);
        return ResponseEntity.ok(userListResponse);
    }

    @Data
    public static class LoginRequest {
        /**
         * Логин пользователя
         */
        @ApiParam("Логин пользователя")
        private String login;

        /**
         * Пароль пользователя
         */
        @ApiParam("Пароль пользователя")
        private String password;

        /**
         * @return Указан ли логин и пароль
         */
        public boolean hasCredentials() {
            return !ObjectUtils.isEmpty(login) && !ObjectUtils.isEmpty(password);
        }
    }
}
