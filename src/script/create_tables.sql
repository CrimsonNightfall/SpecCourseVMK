create table rubr_user_roles
(
    id SERIAL not null
        constraint rubr_user_roles_pk
            primary key,
    name text not null,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);

create table rubr_item_nomenclatures
(
    id SERIAL not null
        constraint rubr_item_nomenclatures_pk
            primary key,
    name text not null,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);

create table rubr_list
(
    id SERIAL not null
        constraint rubr_list_pk
            primary key,
    rubr_table_name text not null,
    rubr_table_description text not null
);

create table obj_users
(
    id SERIAL not null
        constraint obj_users_pk
            primary key,
    login text not null,
    password text not null,
    full_name text not null,
    role_id integer not null
        constraint obj_users_rubr_user_roles_id_fk
            references rubr_user_roles,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);

create table obj_items
(
    id SERIAL not null
        constraint obj_items_pk
            primary key,
    nomenclature_name_id integer not null
        constraint obj_items_rubr_item_nomenclatures_id_fk
            references rubr_item_nomenclatures,
    quantity integer not null,
    create_user_id integer not null
        constraint obj_items_obj_users_id_fk
            references obj_users,
    batch_name text not null,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);