INSERT INTO rubr_user_roles (name, create_time, update_time) VALUES ('stock worker', DEFAULT, DEFAULT);
INSERT INTO rubr_user_roles (name, create_time, update_time) VALUES ('worker', DEFAULT, DEFAULT);
INSERT INTO rubr_item_nomenclatures (name, create_time, update_time) VALUES ('paper', DEFAULT, DEFAULT);
INSERT INTO rubr_item_nomenclatures (name, create_time, update_time) VALUES ('pencil', DEFAULT, DEFAULT);
INSERT INTO rubr_item_nomenclatures (name, create_time, update_time) VALUES ('marker', DEFAULT, DEFAULT);
INSERT INTO rubr_item_nomenclatures (name, create_time, update_time) VALUES ('flash drive', DEFAULT, DEFAULT);
INSERT INTO rubr_item_nomenclatures (name, create_time, update_time) VALUES ('stapler', DEFAULT, DEFAULT);
INSERT INTO rubr_list (rubr_table_name, rubr_table_description) VALUES ('rubr_user_roles', 'Справочник пользовательских ролей');
INSERT INTO rubr_list (rubr_table_name, rubr_table_description) VALUES ('rubr_item_nomenclatures', 'Справочник номенклатур ТМЦ (Товарно-материальных ценностей)');
INSERT INTO obj_users (login, password, full_name, role_id, create_time, update_time) VALUES ('avolkin', 'sd23dg', 'Волкин Алексей Павлович', 000001, DEFAULT, DEFAULT);
INSERT INTO obj_users (login, password, full_name, role_id, create_time, update_time) VALUES ('slastochkin', '45in@las', 'Ласточкин Савелий Антонович', 000001, DEFAULT, DEFAULT);
INSERT INTO obj_users (login, password, full_name, role_id, create_time, update_time) VALUES ('avanechkin', 'sk757!lex', 'Ванечкин Александр Федорович', 000002, DEFAULT, DEFAULT);
INSERT INTO obj_users (login, password, full_name, role_id, create_time, update_time) VALUES ('lartemieva', 'e03vo732l!', 'Артемьева Любовь Ивановна', 000002, DEFAULT, DEFAULT);
INSERT INTO obj_users (login, password, full_name, role_id, create_time, update_time) VALUES ('mnikitin', 'kin18@qw&', 'Никитин Матвей Олегович', 000002, DEFAULT, DEFAULT);
INSERT INTO obj_items (nomenclature_name_id, quantity, create_time, update_time) VALUES (000003, 100, DEFAULT, DEFAULT);
INSERT INTO obj_items (nomenclature_name_id, quantity, create_time, update_time) VALUES (000004, 50, DEFAULT, DEFAULT);
INSERT INTO obj_items (nomenclature_name_id, quantity, create_time, update_time) VALUES (000005, 25, DEFAULT, DEFAULT);
INSERT INTO obj_items (nomenclature_name_id, quantity, create_time, update_time) VALUES (000006, 30, DEFAULT, DEFAULT);
INSERT INTO obj_items (nomenclature_name_id, quantity, create_time, update_time) VALUES (000007, 17, DEFAULT, DEFAULT);