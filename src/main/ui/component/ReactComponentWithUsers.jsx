import React, {useEffect, useState} from 'react';
import '../styles/template_base.css';
import dayjs from 'dayjs';

const ReactComponentWithUsers = () => {
    const [name, setName] = useState('');
    const [nameToEdit, setNameToEdit] = useState('');
    const [id, setId] = useState('');
    const [displayLimit, setDisplayLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('useEffect, will fetch');
        loadDataWithCond();
    }, []);

    const totalPages = Math.ceil(count / displayLimit);

    const pageOptions = Array.from({length: totalPages }, (_, i) => i + 1);

    // const paginatedlist = list.slice((page - 1) * displayLimit, page * displayLimit);

    function loadDataWithCond(page = 1, displayLimit = 10) {
        console.log('loadDataWithCond');
        setPage(page);
        setDisplayLimit(displayLimit);
        return fetch(`/api/auth/list-of-users?page=${page}&displayLimit=${displayLimit}`, {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(response => {
            setList(response.users);
            setCount(response.count)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    // function submit() {
    //     console.log('submit');
    //     return fetch("/api/equipment/add-nomenclature", {
    //         "headers": {"content-type": "application/json"},
    //         "body": JSON.stringify({"name": name}),
    //         "method": "PUT"
    //     });
    // }
    //
    // function edit() {
    //     console.log('edit');
    //     return fetch("/api/equipment/edit-nomenclature", {
    //         "headers": {"content-type": "application/json"},
    //         "body": JSON.stringify({"id": id, "name": nameToEdit}),
    //         "method": "PUT"
    //     });
    // }

    return (
        <div className="template">
            <div className="template__main">
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
                        <th className="table__cell wp-40" rowSpan={1}>ИД</th>
                        <th className="table__cell wp-350" rowSpan={1}>ФИО</th>
                        <th className="table__cell wp-120" rowSpan={1}>Должность</th>
                        <th className="table__cell wp-180" rowSpan={1}>Время создания</th>
                        <th className="table__cell wp-180" rowSpan={1}>Время обновления</th>
                    </tr>
                    </thead>
                    <tbody className="table__body">
                    {list.map((row, index) => {
                        //if (index >= (page - 1) * displayLimit && index < (displayLimit * page)) {
                        return (
                            <ListItemComponent row={row} index={index} loadDataWithCond={loadDataWithCond} page={page} displayLimit={displayLimit} key={row.id}/>
                        );
                        //}
                    })}
                    {/*<ListItemComponent row={null} index={-1} loadDataWithCond={loadDataWithCond} key={null}/>*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ListItemComponent = (props) => {
    const [name, setName] = useState('');
    const [nameToEdit, setNameToEdit] = useState('');
    const [nameToSave, setNameToSave] = useState('');
    const [edit, setEdit] = useState(false);
    // console.log(props, 'myprops');

    // function editRow() {
    //     console.log('edit');
    //     return fetch("/api/equipment/edit-nomenclature", {
    //         "headers": {"content-type": "application/json"},
    //         "body": JSON.stringify({"id": props.row.id, "name": nameToEdit}),
    //         "method": "PUT"
    //     });
    // }
    //
    // function submitRow() {
    //     console.log('submit');
    //     return fetch("/api/equipment/add-nomenclature", {
    //         "headers": {"content-type": "application/json"},
    //         "body": JSON.stringify({"name": nameToSave}),
    //         "method": "PUT"
    //     });
    // }

    return (
        <tr className="table__row" key={props.index}>
            {props.index === -1 ? (
                <>
                    <td className="table__cell wp-40 ta-c rowspan='1'" style={{
                        textAlign: "left"
                    }}>{}</td>
                    <td className="table__cell wp-350 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>
                        {}</td>
                    <td className="table__cell wp-120 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}></td>
                    <td className="table__cell wp-180 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{}</td>
                    <td className="table__cell wp-180 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{}</td>
                </>
            ) : (
                <>
                    <td className="table__cell wp-40 ta-c rowspan='1'" style={{
                        textAlign: "left"
                    }}>{props.row.id}</td>
                    <td className="table__cell wp-350 rowspan='1'" style={{
                        textAlign: "left"
                    }}>
                        {props.row.name}
                    </td>
                    <td className="table__cell wp-350 rowspan='1'" style={{
                        textAlign: "center"
                    }}>
                        {props.row.roleName}
                    </td>
                    <td className="table__cell wp-180 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{dayjs(props.row.createTime).format('YYYY.MM.DD HH:mm')}</td>
                    <td className="table__cell wp-180 ta-c rowspan='1'" style={{
                        textAlign: "center"
                    }}>{dayjs(props.row.updateTime).format('YYYY.MM.DD HH:mm')}</td>
                </>
            )}
        </tr>
    )
}

export {ReactComponentWithUsers};