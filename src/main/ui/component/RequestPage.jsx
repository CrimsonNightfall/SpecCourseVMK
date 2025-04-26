import React, {useEffect, useState} from 'react';;
import '../styles/template_base.css';
import dayjs from 'dayjs';
import {
    Link, useLocation, useNavigate, useParams
} from "react-router-dom";

const RequestPage = () => {
    const location = useLocation();
    // const id = location.state?.id;
    const {id} = useParams();
    console.log("params", id);
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [listOfNom, setListOfNom] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);
    const [request, setRequest] = useState(null);
    const [count, setCount] = useState(0);
    const [nameIdToEdit, setNameToEdit] = useState('');
    const [quantityToEdit, setQuantityToEdit] = useState('');
    const [statusIdToEdit, setStatusIdToEdit] = useState('');
    const [nameIdToSave, setNameIdToSave] = useState('');
    const [quantityToSave, setQuantityToSave] = useState('');
    const [userNameIdToSave, setUserNameIdToSave] = useState('');
    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);

    // const totalPages = Math.ceil(count / displayLimit);

    // const pageOptions = Array.from({length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        console.log('useEffect, will fetch');
        loadListOfUsers();
        loadListOfNomenclatures();
        loadListOfStatuses();
        if (!location.pathname.includes("/add")) {
            loadRequest();
        }
        if (location.pathname.includes("/add")) {
            setSave(true);
        }
    }, []);

    function loadListOfUsers() {
        console.log('load list of users');
        return fetch(`/api/requests/list-of-users`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(list => {
            setListOfUsers(list)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    function loadListOfNomenclatures() {
        console.log('load list of nomenclatures');
        return fetch(`/api/requests/list-of-nomenclatures`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(list => {
            setListOfNom(list)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    function loadListOfStatuses() {
        console.log('load list of statuses');
        return fetch(`/api/requests/list-of-statuses`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(list => {
            setListOfStatuses(list)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    function loadRequest() {
        console.log('load request data', id);
        return fetch(`/api/requests/${id}`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(response => {
            setRequest(response)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    function submitRow() {
        console.log('submit');
        return fetch("/api/requests/add", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"quantity": quantityToSave, "nomenclatureId": nameIdToSave, "createUserId": userNameIdToSave}),
            "method": "PUT"
        });
    }

    function editRow() {
        console.log('edit');
        return fetch("/api/requests/edit", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"id": request?.id, "quantity": quantityToEdit, "nomenclatureId": nameIdToEdit, "statusId": statusIdToEdit}),
            "method": "PUT"
        });
    }

    const handleSaveClick = () => {
        if (nameIdToSave === '') {
            alert('Вы не выбрали номеклатуру');
            return;
        }
        if (quantityToSave === '') {
            alert('Вы не ввели количество');
            return;
        }

        submitRow().then( () => {
            setSave(false);
            navigate('/store/requests');
        });
    }

    return (
        <div className="template">
            <div className="template__main">
                <div>
                    <div className="headline_sticky">
                        <div className="headline">
                            <div className="title title_style_simple title_size_2">
                                <div>
                                    <h1 className="title title_style_simple title_size_2">
                                        <span>Страница Заявки</span>
                                    </h1>
                                </div>
                            </div>
                            <div className="headline__controls">
                                <Link to="/store/requests">
                                    <span className="Btn__icon">
                                        <span className="Btn__text">Вернуться</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="GridLayout flex-g1">
                        <div className="GridLayout__row">
                            <div className="GridLayout__cell">Наименование номенклатуры</div>
                            <div className="GridLayout__cell">
                                {/*<textarea className="Textarea Textarea_style_simple Textarea_size_m Textarea_resize_none Textarea_state_warning va-t w-100" placeholder="Наименование номенклатуры">*/}
                                {edit && (
                                    <select className="Select Select_style_simple Select_size_n Select_darkened" value={nameIdToEdit} onChange={(event) => {
                                        setNameIdToEdit(event.target.value);
                                    }}>
                                        <option value=""></option>
                                        {(listOfNom).map((nomenclature) => (
                                            <option key={nomenclature.id} value={nomenclature.id}>{nomenclature.name}</option>
                                        ))}
                                    </select>
                                )}
                                {save && (
                                    <select className="Select Select_style_simple Select_size_n Select_darkened" value={nameIdToSave} onChange={(e) => {
                                        setNameIdToSave(e.target.value);
                                    }}>
                                        <option value=""></option>
                                        {(listOfNom).map((nomenclature) => (
                                            <option key={nomenclature.id} value={nomenclature.id}>{nomenclature.name}</option>
                                        ))}
                                    </select>
                                )}
                                {!edit && (
                                    <>{request?.nomenclatureName}</>
                                )}
                            {/*</textarea>*/}
                            </div>
                            <div className="GridLayout__cell">Количество</div>
                            <div className="GridLayout__cell">
                                {edit && (
                                    <>
                                        <input className="Input Input_style_simple Input_size_n" value={quantityToEdit} onChange={event => setQuantityToEdit(event.target.value)}/>
                                    </>
                                )}
                                {save && (
                                    <>
                                        <input className={(quantityToSave === '' ? "Input_state_warning " : "") + "Input Input_style_simple Input_size_n"} value={quantityToSave} onChange={event => setQuantityToSave(event.target.value)}/>
                                    </>
                                )}
                                {!edit && (
                                    <>{request?.quantity}</>
                                )}
                            </div>
                        </div>
                        <div className="GridLayout__row">
                            <div className="GridLayout__cell">Создатель</div>
                            <div className="GridLayout__cell">
                                {edit && (
                                    <select className="Select Select_style_simple Select_size_n Select_darkened" value={userNameIdToSave} onChange={(event) => {
                                        setUserNameIdToSave(event.target.value);
                                    }}>
                                        <option value=""></option>
                                        {(listOfUsers).map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                )}
                                {save && (
                                    <>
                                        <select className="Select Select_style_simple Select_size_n Select_darkened" value={userNameIdToSave} onChange={(e) => {
                                            setUserNameIdToSave(e.target.value);
                                        }}>
                                            <option value=""></option>
                                            {(listOfUsers).map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </>
                                )}
                                {!edit && (
                                    <>{request?.userName}</>
                                )}
                            </div>
                            <div className="GridLayout__cell">Статус</div>
                            <div className="GridLayout__cell">
                                {edit && (
                                                <select className="Select Select_style_simple Select_size_n Select_darkened" value={statusIdToEdit} onChange={(event) => {
                                                setStatusIdToEdit(event.target.value);
                                            }}>
                                                <option value=""></option>
                                                {(listOfStatuses).map((status) => (
                                                    <option key={status.id} value={status.id}>{status.name}</option>
                                                ))}
                                            </select>
                                )}
                                {!edit && (
                                    <>{request?.statusName}</>
                                )}
                            </div>
                        </div>
                        <div className="GridLayout__row">
                            <div className="GridLayout__cell">Время регистрации</div>
                            <div className="GridLayout__cell">
                                {!save && (
                                    <>{dayjs(request?.registrationTime).format('YYYY.MM.DD HH:mm')}</>
                                )}
                                {save && (
                                    <>{}</>
                                )}
                            </div>
                            <div className="GridLayout__cell">Время обновления</div>
                            <div className="GridLayout__cell">
                                {!save && (
                                    <>{dayjs(request?.updateTime).format('YYYY.MM.DD HH:mm')}</>
                                )}
                                {save && (
                                    <>{}</>
                                )}
                            </div>
                            <div className="GridLayout__cell">Время завершения</div>
                            <div className="GridLayout__cell">
                                {!save && (
                                    <>
                                        {(request?.completionTime) && (
                                                dayjs(request?.completionTime).format('YYYY.MM.DD HH:mm')
                                        )}
                                        {(!request?.completionTime) && (
                                            <>{}</>
                                        )}
                                    </>
                                )}
                                {save && (
                                    <>{}</>
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        {!save && (

                            <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {
                                editRow().then(value => {
                                    setEdit(false);
                                })
                            }}>
                                <span className="Btn__text">Сохранить</span>
                            </button>
                        )}
                        {!edit && (
                            <>
                                <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={() => {
                                    setEdit(true);
                                    setNameToEdit(request?.nomenclatureId);
                                    setQuantityToEdit(request?.quantity);
                                    setStatusIdToEdit(request?.statusId);
                                    setUserNameIdToSave(request?.createUserId)
                                }}>
                                    <span className="Btn__text">Редактировать</span>
                                </button>
                            </>
                        )}
                        {save && (
                            <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={handleSaveClick}>
                                <span className="Btn__text">Зарегестрировать заявку</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {RequestPage}