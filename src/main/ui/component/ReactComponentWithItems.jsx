import React, {useEffect, useState} from 'react';
import '../styles/template_base.css';
import dayjs from 'dayjs';

const ReactComponentWithItems = () => {
    const [displayLimit, setDisplayLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [list, setList] = useState([]);
    const [listOfNom, setListOfNum] = useState([]);
    const [count, setCount] = useState(0);

    const totalPages = Math.ceil(count / displayLimit);

    const pageOptions = Array.from({length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        console.log('useEffect, will fetch');
        loadListOfNomenclatures();
        loadDataWithCond();
    }, []);

    function loadListOfNomenclatures() {
        console.log('load list of nomenclatures');
        return fetch(`/api/equipment/list-of-nomenclatures`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(list => {
            setListOfNum(list)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    function loadDataWithCond(page = 1, displayLimit = 10) {
        console.log('loadDataWithCond');
        setPage(page);
        setDisplayLimit(displayLimit);
        return fetch(`/api/equipment/list?page=${page}&displayLimit=${displayLimit}`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(response => {
            setList(response.items);
            setCount(response.count)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    return (
        <div className="template">
            <div className="template__main">
                <div>
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
                <div className="pagination">
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
                        <th className="table__cell wp-150" rowSpan={1}>Количество</th>
                        <th className="table__cell wp-150" rowSpan={1}>Создатель</th>
                        <th className="table__cell wp-150" rowSpan={1}>Наименование партии</th>
                        <th className="table__cell wp-120" rowSpan={1}>Время создания</th>
                        <th className="table__cell wp-120" rowSpan={1}>Время обновления</th>
                    </tr>
                    </thead>
                    <tbody className="table__body">
                    {list.map((row, index) => {
                         return (
                            <ListComponent row={row} index={index} loadDataWithCond={loadDataWithCond} listOfNom={listOfNom} page={page} displayLimit={displayLimit} key={row.id}/>
                        );
                    })}
                    <ListComponent row={null} index={-1} loadDataWithCond={loadDataWithCond} listOfNom={listOfNom} key={null}/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ListComponent = (props) => {
    const [name, setName] = useState('');
    const [nameToEdit, setNameToEdit] = useState('');
    const [batchNameToEdit, setBatchNameToEdit] = useState('');
    const [quantityToEdit, setQuantityToEdit] = useState('');
    const [nameToSave, setNameToSave] = useState('');
    const [quantityToSave, setQuantityToSave] = useState('');
    const [batchNameToSave, setBatchNameToSave] = useState('');
    const [edit, setEdit] = useState(false);
    const [editBatch, setBatchToEdit] = useState(false);
    const [editQuant, setQuantToEdit] = useState(false);
    // console.log(props, 'myprops');

    function editRow() {
        console.log('edit');
        return fetch("/api/equipment/edit", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"id": props.row.id, "nomenclatureName": nameToEdit}),
            "method": "PUT"
        });
    }

    function editCount() {
        console.log('edit count');
        return fetch("/api/equipment/edit-count", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"id": props.row.id, "count": quantityToEdit}),
            "method": "PUT"
        });
    }

    function editBatchName() {
        console.log('edit batch name');
        return fetch("/api/equipment/edit-batch-name", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"id": props.row.id, "batchName": batchNameToEdit}),
            "method": "PUT"
        });
    }

    function submitRow() {
        console.log('submit');
        return fetch("/api/equipment/add-item", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"count": quantityToSave, "batchName": batchNameToSave, "nomenclatureName": nameToSave}),
            "method": "PUT"
        });
    }

    return (
        <tr className="table__row" key={props.index}>
            {props.index === -1 ? (
                <>
                    <td className="table__cell wp-20 ta-c rowspan='1'" style={{
                        textAlign: "left"
                    }}>{}</td>
                    <td className="table__cell wp-150 rowspan='1'">{
                        <>
                            {/*<input className="Input Input_style_simple Input_size_n" value={nameToSave} onChange={event => setNameToSave(event.target.value)}/>*/}
                            <select className="Select Select_style_simple Select_size_n Select_darkened" value={nameToSave} onChange={(e) => {
                                setNameToSave(event.target.value);
                            }}>
                                <option value=""></option>
                                {(props.listOfNom).map((nomenclature) => (
                                    <option key={nomenclature.id} value={nomenclature.name}>{nomenclature.name}</option>
                                ))}
                            </select>
                            {/*<button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {*/}
                            {/*    submitRow().then(value => {*/}
                            {/*        props.loadDataWithCond(props.page, props.displayLimit);*/}
                            {/*    })*/}
                            {/*}}> <span className="Btn__text" style={{*/}
                            {/*    textAlign: "right"*/}
                            {/*}}>Отправить</span></button>*/}
                        </>
                    }</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{
                        <>
                            <input className="Input Input_style_simple Input_size_n" value={quantityToSave} onChange={event => setQuantityToSave(event.target.value)}/>
                        </>
                    }</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{}</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{
                        <>
                            <input className="Input Input_style_simple Input_size_n" value={batchNameToSave} onChange={event => setBatchNameToSave(event.target.value)}/>
                        </>
                    }</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{}</td>
                    <td>
                        <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {
                            submitRow().then(value => {
                                props.loadDataWithCond(props.page, props.displayLimit);
                            })
                        }}> <span className="Btn__text" style={{
                            textAlign: "right"
                        }}>Отправить</span></button>
                    </td>
                </>
            ) : (
                <>
                    <td className="table__cell wp-20 ta-c rowspan='1'" style={{
                        textAlign: "left"
                    }}>{props.row.id}</td>
                    <td className="table__cell wp-150 rowspan='1'">
                        {edit && (
                            <div>
                                <input className="Input Input_style_simple Input_size_n" value={nameToEdit} onChange={event => setNameToEdit(event.target.value)}/>
                                <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {
                                    editRow().then(value => {
                                        props.loadDataWithCond(props.page, props.displayLimit);
                                        setEdit(false);
                                    })
                                }}><span className="Btn__text">Изменить</span></button>
                            </div>
                        )}
                        {!edit && (
                            <>{props.row.nomenclatureName}
                                <span className="Btn__icon Btn_size_n" onClick={() => {setEdit(true); setNameToEdit(props.row.nomenclatureName)}}>
                                        ✏️
                                </span>
                            </>
                        )}
                    </td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>
                        {editQuant && (
                            <div>
                                <input className="Input Input_style_simple Input_size_n" value={quantityToEdit} onChange={event => setQuantityToEdit(event.target.value)}/>
                                <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {
                                    editCount().then(value => {
                                        props.loadDataWithCond(props.page, props.displayLimit);
                                        setQuantToEdit(false);
                                    })
                                }}><span className="Btn__text">Изменить</span></button>
                            </div>
                        )}
                        {!editQuant && (
                            <>{props.row.count}
                                <span className="Btn__icon Btn_size_n" onClick={() => {setQuantToEdit(true); setQuantityToEdit(props.row.count)}}>
                                        ✏️
                                </span>
                            </>
                        )}</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{props.row.createUserId}</td>
                    <td className="table__cell wp-150 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>
                        {editBatch && (
                            <div>
                                <input className="Input Input_style_simple Input_size_n" value={batchNameToEdit} onChange={event => setBatchNameToEdit(event.target.value)}/>
                                <button className="Btn Btn_style_simple Btn_size_n Btn_color_blue3 no-wr Btn_darkened" onClick={event => {
                                    editBatchName().then(value => {
                                        props.loadDataWithCond(props.page, props.displayLimit);
                                        setBatchToEdit(false);
                                    })
                                }}><span className="Btn__text">Изменить</span></button>
                            </div>
                        )}
                        {!editBatch && (
                            <>{props.row.batchName}
                                <span className="Btn__icon Btn_size_n" onClick={() => {setBatchToEdit(true); setBatchNameToEdit(props.row.batchName)}}>
                                        ✏️
                                </span>
                            </>
                        )}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{dayjs(props.row.createTime).format('YYYY.MM.DD HH:mm')}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{dayjs(props.row.updateTime).format('YYYY.MM.DD HH:mm')}</td>
                </>
            )}
        </tr>
    )
}

export {ReactComponentWithItems};