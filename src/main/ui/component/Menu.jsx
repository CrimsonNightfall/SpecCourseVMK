import { Link } from 'react-router-dom';
import React from "react";
import {useLocation} from "react-router-dom";

const Menu = () => {
    const location = useLocation();
    console.log("pathname", location.pathname);
    return (
        <>
            <nav className="HeaderNavTop__nav HeaderNavTop__nav_mode_open false">
                <div className="Carousel HeaderNavTop__nav_level_1 ">
                    <div className="Carousel__wrapper HeaderNavTop__nav_level_1_wrapper">
                        <div className="Carousel__slider HeaderNavTop__nav_level_1_slider">
                            <ul className="HeaderNavTop__nav__items_list">
                                <li className="HeaderNavTop__nav__item  HeaderNavTop__nav__item_current">
                                    <Link to="/store" className="HeaderNavTop__nav__link">Склад</Link></li>
                                <li className="HeaderNavTop__nav__item">
                                    <Link to="/user" className="HeaderNavTop__nav__link">Пользователь</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Carousel HeaderNavTop__nav_level_2 ">
                    <div className="Carousel__wrapper HeaderNavTop__nav_level_2_wrapper">
                        <div className="Carousel__slider HeaderNavTop__nav_level_2_slider">
                            <ul className="HeaderNavTop__nav__items_list">
                                <li className={location.pathname === "/store/nomenclature" ? "HeaderNavTop__nav__item  HeaderNavTop__nav__item_current" : "HeaderNavTop__nav__link"}>
                                    <Link to="/store/nomenclature" className="HeaderNavTop__nav__link">Номенклатура</Link></li>
                                <li className={location.pathname === "/store/items" ? "HeaderNavTop__nav__item  HeaderNavTop__nav__item_current" : "HeaderNavTop__nav__link"}>
                                    <Link to="/store/items" className="HeaderNavTop__nav__link">ТМЦ</Link></li>
                                <li className={location.pathname === "/store/requests" ? "HeaderNavTop__nav__item  HeaderNavTop__nav__item_current" : "HeaderNavTop__nav__link"}>
                                    <Link to="/store/requests" className="HeaderNavTop__nav__link">Заявки</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <span className="hint__btn js-tooltip js-hint__open none" title="Легенда"></span>
            </nav>
            {/*<nav>*/}
            {/*    <Link to="/nomenclature">Nomenclature list</Link>*/}

            {/*    <Link to="/items">Items list</Link>*/}

            {/*    <Link to="/requests">Requests list</Link>*/}
            {/*</nav>*/}
        </>
    )
}

export default Menu;