select obj_items.*, obj_users.login, obj_users.full_name, coalesce(rubr_item_nomenclatures.name, 'Неизвестно') as name
    from obj_items
        left join rubr_item_nomenclatures
            on obj_items.nomenclature_name_id = rubr_item_nomenclatures.id
        left join obj_users
            on obj_items.create_user_id = obj_users.id;

select obj_items.*, obj_users.login, obj_users.full_name, coalesce(rubr_item_nomenclatures.name, 'Неизвестно') as name
    from obj_items
         left join rubr_item_nomenclatures
             on obj_items.nomenclature_name_id = rubr_item_nomenclatures.id
         left join obj_users
             on obj_items.create_user_id = obj_users.id
    where (rubr_item_nomenclatures.name = 'pencil' or rubr_item_nomenclatures.name = 'marker') and obj_items.quantity > 40;

select obj_items.*, obj_users.login, obj_users.full_name, coalesce(rubr_item_nomenclatures.name, 'Неизвестно') as name
    from obj_items
        left join rubr_item_nomenclatures
            on obj_items.nomenclature_name_id = rubr_item_nomenclatures.id
        left join obj_users
            on obj_items.create_user_id = obj_users.id
    where obj_users.login = 'avolkin';

select obj_items.*, obj_users.login, obj_users.full_name, coalesce(rubr_item_nomenclatures.name, 'Неизвестно') as name
    from obj_items
        left join rubr_item_nomenclatures
            on obj_items.nomenclature_name_id = rubr_item_nomenclatures.id
        left join obj_users
            on obj_items.create_user_id = obj_users.id
    limit 3;

select rubr_item_nomenclatures.id, rubr_item_nomenclatures.name, sum(obj_items.quantity) as total_count
    from rubr_item_nomenclatures
        left join obj_items
            on rubr_item_nomenclatures.id = obj_items.nomenclature_name_id
    group by rubr_item_nomenclatures.id, rubr_item_nomenclatures.name;

select rubr_item_nomenclatures.id, rubr_item_nomenclatures.name
    from rubr_item_nomenclatures
        left join obj_items
            on rubr_item_nomenclatures.id = obj_items.nomenclature_name_id
    group by rubr_item_nomenclatures.id, rubr_item_nomenclatures.name
    having coalesce(sum(obj_items.quantity), 0) = 0;