import React, {useEffect, useState} from 'react';

const ReactComponentWithRestExample = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [someId, setSomeId] = useState('');

    const [list, setList] = useState([]);

    useEffect(() => {
        console.log('useEffect, will fetch');
        loadData();
    }, []);

    function loadData() {
        console.log('loadData');
        return fetch("/api/example/", {
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
        return fetch("/api/example/add", {
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify([{"name": name, "some_id": +someId, "date": date}]),
            "method": "POST"
        });
    }

    return (
        <div className="template">
            <div className="template__main">
                {list.map((row, index) => {
                    return (
                        <p style={{marginBottom: '10px'}} key={index}>
                            <b>id: {row.id}</b><br/>
                            <b>some_id: {row.some_id}</b><br/>
                            <b>name: {row.name}</b><br/>
                            <b>date: {row.date}</b><br/>
                        </p>
                    );
                })}
                <hr/>
                Name: <input value={name} onChange={event => setName(event.target.value)}/>
                Some_id: <input value={someId} onChange={event => setSomeId(event.target.value)}/>
                Date: <input value={date} onChange={event => setDate(event.target.value)}/><br />
                <button onClick={event => {
                    submit().then(value => {
                        loadData();
                    })
                }}>Отправить</button>
            </div>
        </div>
    )
}

export {ReactComponentWithRestExample};