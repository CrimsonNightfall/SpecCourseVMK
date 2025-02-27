create table rubr_user_roles
(
    id integer not null
        constraint rubr_user_roles_pk
            primary key,
    name text not null,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);

create table rubr_inventory_holdings_nomenclatures
(
    id integer not null
        constraint rubr_inventory_holdings_nomenclatures_pk
            primary key,
    name text not null,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);

create table rubr_list
(
    id integer not null
        constraint rubr_list_pk
        prinary key,
    rubr_table_name string not null,
    rubr_table_description text not null
);

create table obj_users
(
    id integer not null
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

create table obj_inventory_holdings
(
    id integer not null
        constraint obj_inventory_holdings_pk
            primary key,
    nomenclature_name_id integer not null
        constraint obj_inventory_holdings_rubr_inventory_holdings_nomenclatures_id_fk
            references rubr_inventory_holdings_nomenclatures,
    quantity integer not null,
    create_time timestamp with time zone default current_timestamp,
    update_time timestamp with time zone default current_timestamp
);