import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            select: 'name'
        }
        this.changeSelect = this.changeSelect.bind(this);
    }

    changeSelect(data) {
        this.setState(() => {
            return {
                select: data
            }
        })
    }

    render() {
        const {changeSearchFilter, searchTable} = this.props;

        return (
            <form name="search">
            <input onInput={(event) => {searchTable(event.target.value)}} type="text" name="clue"/>
            <input onChange={(event) => {
                changeSearchFilter(event.target.value);
                this.changeSelect(event.target.value);
            }} checked={this.state.select === 'name'} type="radio" name="area" value="name"/>Name
            <input onChange={(event) => {
                changeSearchFilter(event.target.value);
                this.changeSelect(event.target.value);
            }} checked={this.state.select === 'login'} type="radio" name="area" value="login"/>Login
            <input onChange={(event) => {
                changeSearchFilter(event.target.value);
                this.changeSelect(event.target.value);
            }} checked={this.state.select === 'email'} type="radio" name="area" value="email"/>Email
            <input onChange={(event) => {
                changeSearchFilter(event.target.value);
                this.changeSelect(event.target.value);
            }} checked={this.state.select === 'age'} type="radio" name="area" value="age"/>Age
            <input onChange={(event) => {
                changeSearchFilter(event.target.value);
                this.changeSelect(event.target.value);
            }} checked={this.state.select === 'id'} type="radio" name="area" value="id"/>ID
        </form>
        )
    }
}