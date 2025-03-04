import React, {useState} from 'react';

const FirstReactComponent = () => {
    const [value, setValue] = useState('')
    const list = [{id: 1, name: 'asd'}, {id: 2, name: 'qwe'}]
    return (
        <div>
            {list.map((row, index) => {
                return (
                    <div>
                        <p>Наименование {row.name}</p>
                    </div>
                )
            })}
            <p>You entered: {value}</p>
            <input value={value} onChange={event => setValue(event.target.value)} />
        </div>
    )
}

export {FirstReactComponent};