import React, {useEffect, useState} from 'react';
import '../styles/template_base.css';
import dayjs from 'dayjs';
import {
    Link, useLocation
} from "react-router-dom";

const ReactComponentWithRequests = () => {
    const [displayLimit, setDisplayLimit] = useState(10);
    const [page, setPage] = useState(1);
    const location = useLocation();

    const [list, setList] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [listOfNom, setListOfNom] = useState([]);
    const [listOfStatuses, setListOfStatuses] = useState([]);
    const [count, setCount] = useState(0);

    const totalPages = Math.ceil(count / displayLimit);

    const pageOptions = Array.from({length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        console.log('useEffect, will fetch');
        loadListOfUsers();
        loadListOfNomenclatures();
        loadListOfStatuses();
        loadDataWithCond();
    }, [location.pathname]);

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

    function loadDataWithCond(page = 1, displayLimit = 10) {
        console.log('loadDataWithCond');
        setPage(page);
        setDisplayLimit(displayLimit);
        return fetch(`/api/requests/list?page=${page}&displayLimit=${displayLimit}`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(response => {
            setList(response.requests);
            setCount(response.count)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    return (
        <div className="template">
            <div className="template__main">
                <div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        Таблица Заявок
                    </div>
                    <div style={{
                        textAlign: "right"
                    }}>
                        <Link to="/store/requests/add">
                            <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened">
                                <span className="Btn__icon">
                                    <span className="Btn__text">Зарегестрировать</span>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div style={{
                    textAlign: "right"
                }}>
                    <label>
                        Показ.:
                        <select className="Select Select_style_simple Select_size_n Select_darkened" value={displayLimit} onChange={(e) => {
                            loadDataWithCond(1, Number(e.target.value));
                        }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
                <div className="pagination" style={{
                    textAlign: "right"
                }}>
                    <label>
                        Стр.:
                        {pageOptions.map(pageNum => (
                            <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" key={pageNum} onClick={(e) => {
                                loadDataWithCond(pageNum, displayLimit);
                            }} disabled={pageNum === page}>
                                {pageNum}
                            </button>
                        ))}
                    </label>
                </div>
                <table className="table table_style_simple w-100" style={{
                    borderCollapse: "separate",
                    borderSpacing: "0px",
                    tableLayout: "fixed"
                }}>
                    <thead className="table__head">
                    <tr className="table__row">
                        <th className="table__cell wp-20" rowSpan={1}>ИД</th>
                        <th className="table__cell wp-150" rowSpan={1}>Наименование номенклатуры</th>
                        <th className="table__cell wp-100" rowSpan={1}>Количество</th>
                        <th className="table__cell wp-150" rowSpan={1}>Создатель</th>
                        <th className="table__cell wp-150" rowSpan={1}>Статус</th>
                        <th className="table__cell wp-120" rowSpan={1}>Время регистрации</th>
                        <th className="table__cell wp-120" rowSpan={1}>Время обновления</th>
                        <th className="table__cell wp-120" rowSpan={1}>Время завершения</th>
                        <th className="table__cell wp-120" rowSpan={1}>Управление</th>
                    </tr>
                    </thead>
                    <tbody className="table__body">
                    {list.map((row, index) => {
                        return (
                            <ListComponent row={row} index={index} loadDataWithCond={loadDataWithCond} listOfUsers={listOfUsers} listOfNom={listOfNom} listOfStatuses={listOfStatuses} page={page} displayLimit={displayLimit} key={row.id}/>
                        );
                    })}
                    {/*<ListComponent row={null} index={-1} loadDataWithCond={loadDataWithCond} listOfUsers={listOfUsers} listOfNom={listOfNom} listOfStatuses={listOfStatuses} key={null}/>*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ListComponent = (props) => {
    const [nameIdToEdit, setNameToEdit] = useState('');
    const [quantityToEdit, setQuantityToEdit] = useState('');
    const [statusIdToEdit, setStatusIdToEdit] = useState('');
    const [nameIdToSave, setNameIdToSave] = useState('');
    const [quantityToSave, setQuantityToSave] = useState('');
    const [userNameIdToSave, setUserNameIdToSave] = useState('');
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('')
    // console.log(props, 'myprops');

    function editRow() {
        console.log('edit');
        return fetch("/api/requests/edit", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"id": props.row.id, "quantity": quantityToEdit, "nomenclatureId": nameIdToEdit, "statusId": statusIdToEdit}),
            "method": "PUT"
        });
    }
    //
    // function editCount() {
    //     console.log('edit count');
    //     return fetch("/api/requests/edit-count", {
    //         "headers": {"content-type": "application/json"},
    //         "body": JSON.stringify({"id": props.row.id, "count": quantityToEdit}),
    //         "method": "PUT"
    //     });
    // }

    function submitRow() {
        console.log('submit');
        return fetch("/api/requests/add", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"quantity": quantityToSave, "nomenclatureId": nameIdToSave, "createUserId": userNameIdToSave}),
            "method": "PUT"
        });
    }

    return (
        <tr className="table__row" key={props.index}>
            {/*{edit === true || props.index === -1 ? (*/}
            {/*    <>*/}
            {/*        <td className="table__cell wp-20 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "left"*/}
            {/*        }}>*/}
            {/*            <Link to={`/store/requests/${props.row.id}`} style={{*/}
            {/*                display: "block"*/}
            {/*            }}><div>{props.row.id}</div></Link>*/}
            {/*        /!*    {edit && (*!/*/}
            {/*        /!*    <div>*!/*/}
            {/*        /!*        <Link to="/store/requests/add">{props.row.id}</Link>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        /!*)}*!/*/}
            {/*        /!*    {!edit && (*!/*/}
            {/*        /!*        <>{}</>*!/*/}
            {/*        /!*    )}*!/*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-150 rowspan='1'">*/}
            {/*            {edit && (*/}
            {/*                <select className="Select Select_style_simple Select_size_n Select_darkened" value={nameIdToEdit} onChange={(event) => {*/}
            {/*                    setNameIdToEdit(event.target.value);*/}
            {/*                }}>*/}
            {/*                    <option value=""></option>*/}
            {/*                    {(props.listOfNom).map((nomenclature) => (*/}
            {/*                        <option key={nomenclature.id} value={nomenclature.id}>{nomenclature.name}</option>*/}
            {/*                    ))}*/}
            {/*                </select>*/}
            {/*            )}*/}
            {/*            {!edit && (*/}
            {/*                <>*/}
            {/*                    /!*<input className="Input Input_style_simple Input_size_n" value={nameToSave} onChange={event => setNameToSave(event.target.value)}/>*!/*/}
            {/*                    <select className="Select Select_style_simple Select_size_n Select_darkened" value={nameIdToSave} onChange={(e) => {*/}
            {/*                        setNameIdToSave(e.target.value);*/}
            {/*                    }}>*/}
            {/*                        <option value=""></option>*/}
            {/*                        {(props.listOfNom).map((nomenclature) => (*/}
            {/*                            <option key={nomenclature.id} value={nomenclature.id}>{nomenclature.name}</option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-100 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "center"*/}
            {/*        }}>*/}
            {/*            {edit && (*/}
            {/*                <>*/}
            {/*                    <input className="Input Input_style_simple Input_size_n" value={quantityToEdit} onChange={event => setQuantityToEdit(event.target.value)}/>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*            {!edit && (*/}
            {/*                <>*/}
            {/*                    <input className={(quantityToSave === '' ? "Input_state_warning " : "") + "Input Input_style_simple Input_size_n"} value={quantityToSave} onChange={event => setQuantityToSave(event.target.value)}/>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-150 rowspan='1'">*/}
            {/*            {edit && (*/}
            {/*                <select className="Select Select_style_simple Select_size_n Select_darkened" value={userNameIdToSave} onChange={(event) => {*/}
            {/*                    setUserNameIdToSave(event.target.value);*/}
            {/*                }}>*/}
            {/*                    <option value=""></option>*/}
            {/*                    {(props.listOfUsers).map((user) => (*/}
            {/*                        <option key={user.id} value={user.id}>{user.name}</option>*/}
            {/*                    ))}*/}
            {/*                </select>*/}
            {/*            )}*/}
            {/*            {!edit && (*/}
            {/*                <>*/}
            {/*                    <select className="Select Select_style_simple Select_size_n Select_darkened" value={userNameIdToSave} onChange={(e) => {*/}
            {/*                        setUserNameIdToSave(e.target.value);*/}
            {/*                    }}>*/}
            {/*                        <option value=""></option>*/}
            {/*                        {(props.listOfUsers).map((user) => (*/}
            {/*                            <option key={user.id} value={user.id}>{user.name}</option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-150 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "center"*/}
            {/*        }}>{edit && (*/}
            {/*            <select className="Select Select_style_simple Select_size_n Select_darkened" value={statusIdToEdit} onChange={(event) => {*/}
            {/*                setStatusIdToEdit(event.target.value);*/}
            {/*            }}>*/}
            {/*                <option value=""></option>*/}
            {/*                {(props.listOfStatuses).map((status) => (*/}
            {/*                    <option key={status.id} value={status.id}>{status.name}</option>*/}
            {/*                ))}*/}
            {/*            </select>*/}
            {/*        )}*/}
            {/*            {!edit && (*/}
            {/*                <>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-120 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "center"*/}
            {/*        }}>{edit && (*/}
            {/*            <>{dayjs(props.row.registrationTime).format('YYYY.MM.DD HH:mm')}</>*/}
            {/*        )}*/}
            {/*            {!edit && (*/}
            {/*                <>{}</>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-120 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "center"*/}
            {/*        }}>{edit && (*/}
            {/*            <>{dayjs(props.row.updateTime).format('YYYY.MM.DD HH:mm')}</>*/}
            {/*        )}*/}
            {/*            {!edit && (*/}
            {/*                <>{}</>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-120 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "center"*/}
            {/*        }}>{edit && (*/}
            {/*            <>{dayjs(props.row.completionTime).format('YYYY.MM.DD HH:mm')}</>*/}
            {/*        )}*/}
            {/*            {!edit && (*/}
            {/*                <>{}</>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*        <td className="table__cell wp-120 ta-c rowspan='1'" style={{*/}
            {/*            textAlign: "center"*/}
            {/*        }}>*/}
            {/*            {edit && (*/}
            {/*                <div>*/}
            {/*                    <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {*/}
            {/*                        editRow().then(value => {*/}
            {/*                            props.loadDataWithCond(props.page, props.displayLimit);*/}
            {/*                            setEdit(false);*/}
            {/*                        })*/}
            {/*                    }}><span className="Btn__text">Сохранить</span></button>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*            {!edit && (*/}
            {/*                <>*/}
            {/*                    <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {*/}
            {/*                        if (nameIdToSave === '') {*/}
            {/*                            alert('Вы не выбрали номеклатуру');*/}
            {/*                            return;*/}
            {/*                        }*/}
            {/*                        if (quantityToSave === '') {*/}
            {/*                            alert('Вы не ввели количество');*/}
            {/*                            return;*/}
            {/*                        }*/}
            {/*                        submitRow().then(value => {*/}
            {/*                            props.loadDataWithCond(props.page, props.displayLimit);*/}
            {/*                        })*/}
            {/*                    }}><span className="Btn__text">Отправить</span></button>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        </td>*/}
            {/*    </>*/}
            {/*) : (*/}
                <>
                    <td className="table__cell wp-20 ta-c rowspan='1'" style={{
                        textAlign: "left"
                    }}>
                        <Link to={`/store/requests/${props.row.id}`} state={{id: props.row.id}} style={{
                            display: "block"
                        }}>{props.row.id}</Link>
                    </td>
                    <td className="table__cell wp-150 rowspan='1'">
                        {props.row.nomenclatureName}
                    </td>
                    <td className="table__cell wp-100 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{props.row.quantity}</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{props.row.userName}</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{props.row.statusName}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{dayjs(props.row.registrationTime).format('YYYY.MM.DD HH:mm')}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{dayjs(props.row.updateTime).format('YYYY.MM.DD HH:mm')}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>
                        {(props.row.completionTime) && (
                            dayjs(props.row.completionTime).format('YYYY.MM.DD HH:mm')
                        )}
                        {(!props.row.completionTime) && (
                            <>{}</>
                        )}
                    </td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{
                        <>
                            <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={() => {
                                setEdit(true);
                                setNameIdToEdit(props.row.nomenclatureId);
                                setQuantityToEdit(props.row.count);
                                setStatusIdToEdit(props.row.statusId)
                            }}>
                                <span className="Btn__text">Редактировать</span>
                                {/*✏️*/}
                            </button>
                        </>
                    }</td>
                </>
            {/*)}*/}
        </tr>
    )
}

export {ReactComponentWithRequests};