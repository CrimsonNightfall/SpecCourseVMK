import { Link } from 'react-router-dom';
import React from "react";

const Menu = () => {
    return (
        <>
            <nav className="HeaderNavTop__nav HeaderNavTop__nav_mode_open false">
                <div className="Carousel HeaderNavTop__nav_level_1 ">
                    <div className="Carousel__wrapper HeaderNavTop__nav_level_1_wrapper">
                        <div className="Carousel__slider HeaderNavTop__nav_level_1_slider">
                            <ul className="HeaderNavTop__nav__items_list">
                                <li className="HeaderNavTop__nav__item  HeaderNavTop__nav__item_current" data-id="-7"><a
                                    className="HeaderNavTop__nav__link" href="/cp/company">Компания</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="-2"><a
                                    className="HeaderNavTop__nav__link" href="/cp/projects">Проекты</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="-5"><a
                                    className="HeaderNavTop__nav__link" href="/cp/users">Пользователь</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="-3"><a
                                    className="HeaderNavTop__nav__link" href="/cp/finances">Финансы</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="-1"><a
                                    className="HeaderNavTop__nav__link" href="/cp/administration">Администрирование</a>
                                </li>
                                <li className="HeaderNavTop__nav__item " data-id="-4"><a
                                    className="HeaderNavTop__nav__link" href="/cp/infrastructure">Инфраструктура</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Carousel HeaderNavTop__nav_level_2 ">
                    <div className="Carousel__wrapper HeaderNavTop__nav_level_2_wrapper">
                        <div className="Carousel__slider HeaderNavTop__nav_level_2_slider">
                            <ul className="HeaderNavTop__nav__items_list">
                                <li className="HeaderNavTop__nav__item " data-id="20"><a
                                    className="HeaderNavTop__nav__link"
                                    href="/cp/company/orgstructure">Орг.структура</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="35"><a
                                    className="HeaderNavTop__nav__link" href="/cp/company/organizations">Контрагенты</a>
                                </li>
                                <li className="HeaderNavTop__nav__item " data-id="12"><a
                                    className="HeaderNavTop__nav__link" href="/cp/company/inform">Новости
                                    (информирование)</a></li>
                                <li className="HeaderNavTop__nav__item  HeaderNavTop__nav__item_current" data-id="11"><a
                                    className="HeaderNavTop__nav__link" href="/cp/company/calendar">Календарь</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="13"><a
                                    className="HeaderNavTop__nav__link" href="/cp/company/search">Поиск</a></li>
                                <li className="HeaderNavTop__nav__item " data-id="25"><a
                                    className="HeaderNavTop__nav__link" href="/cp/company/molnetka">МОлНЕТКИ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <span className="hint__btn js-tooltip js-hint__open none" title="Легенда"></span></nav>
            <nav>
                <Link to="/nomenclature">Nomenclature list</Link>

                <Link to="/items">Items list</Link>

                <Link to="/requests">Requests list</Link>
            </nav>
        </>
    )
}

export default Menu;