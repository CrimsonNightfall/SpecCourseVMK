import React, {useEffect, useState} from 'react';

const ReactComponentWithNomenclature = () => {
    const [name, setName] = useState('');
    const [nameToEdit, setNameToEdit] = useState('');
    const [id, setId] = useState('');
    // const [create_time, setCreatedate] = useState('');
    // const [update_time, setUpdatedate] = useState('');

    const [list, setList] = useState([]);

    useEffect(() => {
        console.log('useEffect, will fetch');
        loadData();
    }, []);

    function loadData() {
        console.log('loadData');
        return fetch("/api/equipment/nomenclatures", {
            "method": "GET"
        }).then(response => {
            console.log('receiver response, status', response.status);
            if (response.ok) {
                return response.json()
            }
        }).then(list => {
            setList(list)
        }).catch(reason => {
            console.error('error', reason);
        });
    }

    function submit() {
        console.log('submit');
        return fetch("/api/equipment/add-nomenclature", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"name": name}),
            "method": "PUT"
        });
    }

    function edit() {
        console.log('edit');
        return fetch("/api/equipment/edit-nomenclature", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify({"id": id, "name": nameToEdit}),
            "method": "PUT"
        });
    }

    return (
        <div>
            {list.map((row, index) => {
                return (
                    <p style={{marginBottom: '10px'}} key={index}>
                        <b>id: {row.id}</b><br/>
                        <b>name: {row.name}</b><br/>
                        <b>create_time: {row.createTime}</b><br/>
                        <b>update_time: {row.updateTime}</b><br/>
                    </p>
                );
            })}
            <hr/>
            Name: <input value={name} onChange={event => setName(event.target.value)}/>
            <button onClick={event => {
                submit().then(value => {
                    loadData();
                })
            }}>Отправить</button>
            <hr/>
            Id: <input value={id} onChange={event => setId(event.target.value)}/>
            Name: <input value={nameToEdit} onChange={event => setNameToEdit(event.target.value)}/>
            <button onClick={event => {
                edit().then(value => {
                    loadData();
                })
            }}>Изменить</button>
        </div>
    )
}

export {ReactComponentWithNomenclature};