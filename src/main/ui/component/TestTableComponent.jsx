import React from 'react';
import '../styles/TestTable.css';

const TestTableComponent = () => {
    return (
        <div>
            <table className="TestTable">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">login</th>
                    <th scope="col">full_name</th>
                    <th scope="col">role_name</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">336316</th>
                    <td>k4RnXV8C</td>
                    <td>Савин Вячеслав Артёмович</td>
                    <td>Работник</td>
                </tr>
                <tr>
                    <th scope="row">622836</th>
                    <td>v7NECGZM</td>
                    <td>Иванова София Константиновна</td>
                    <td>Работник</td>
                </tr>
                <tr>
                    <th scope="row">670449</th>
                    <td>i8UsldYr</td>
                    <td>Фокин Матвей Александрович</td>
                    <td>Складовщик</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export {TestTableComponent};