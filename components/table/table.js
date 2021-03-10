import React from 'react';

import './table.css';

export default class Table extends React.Component {

    render() {
        const {pandas, pagination, page, sortTable} = this.props;

        const currentPandas = pandas.slice((page * pagination), (page * pagination) + pagination);
        const elements = currentPandas.map(panda => {
            return (
                <tr key={panda.id} className='row'>
                    <td>{panda.name}</td>
                    <td>{panda.login}</td>
                    <td>{panda.email}</td>
                    <td>{panda.age}</td>
                    <td>{panda.id}</td>
                </tr>
            )
        });
    
        return (
            <table>
                <thead>
                    <tr onClick={(event) => sortTable(event.target.getAttribute('data-column'))}>
                        <th data-column="name" className="header">Panda's name</th>
                        <th data-column="login" className="header">Login</th>
                        <th data-column="email" className="header">Email</th>
                        <th data-column="age" className="header">Age</th>
                        <th data-column="id" className="header">ID</th>
                    </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>
            </table>
        )
    }
}