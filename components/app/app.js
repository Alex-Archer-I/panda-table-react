import React from 'react';

import Table from '../table/table';
import PageChange from '../page-change/page-change';
import SearchPanel from '../search-panel/search-panel';

import './app.css';

let pandas = [];

export default class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pagination: 10,
            page: 0,
            searchFilter: 'name',
            hasSorted: {
                name: false,
                login: false,
                email: false,
                age: false,
                id: false
            }
        };

        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.changeSearchFilter = this.changeSearchFilter.bind(this);
        this.searchTable = this.searchTable.bind(this);
        this.sortTable = this.sortTable.bind(this);

    }

    async getData(url) {
        const res = await fetch(url);

        if (!res.ok) {
            console.log("Error!");
        }
    
        return await res.json();
    }

    async getUser() {
        const res = await this.getData('https://randomuser.me/api/?results=100&inc=name,email,id,login,dob&nat=gb&noinfo');

        pandas = res.results.map(user => {
            return {
                name: user.name.first,
                login: user.login.username,
                email: user.email,
                age: user.dob.age,
                id: user.id.value,
            };
        });
        this.setState(() => {
            return {
                data: pandas.slice()
            }
        })
    }

    componentDidMount() {
        this.getUser();
    }

    nextPage() {
        if ((this.state.page + 1) !== Math.ceil(this.state.data.length / this.state.pagination)) {
            let a = this.state.page + 1;
            this.setState(() => {
                return {
                    page: a
                }
            });
        }
    }

    prevPage() {
        if (this.state.page !== 0) {
            let a = this.state.page - 1;
            this.setState(() => {
                return {
                    page: a
                }
            });
        }
    }

    changeSearchFilter(filter) {
        this.setState(() => {
            return {
                searchFilter: filter
            }
        });
    }

    searchTable(val) {
        let regex = new RegExp(`${val}`, 'i');
        let currentPandas = pandas.filter((panda) => {
            return regex.test(panda[this.state.searchFilter]);
        });
        let curretSort = {
            name: false,
            login: false,
            email: false,
            age: false,
            id: false
        }
        this.setState(() => {
            return {
                data: currentPandas,
                hasSorted: curretSort
            }
        });
    }

    sortTable(data) {
        let currentPandas = this.state.data.slice();
        let currentSort = {};
        for (let key in this.state.hasSorted) {
            currentSort[key] = this.state.hasSorted[key]
        }

        if (currentSort[data] === true) {
            currentPandas.reverse();
        } else {
            currentPandas.sort((a, b) => {
                if (a[data] > b[data]) {return 1;}
                if (a[data] === b[data]) {return 0;}
                if (a[data] < b[data]) {return -1;}
                return null;
            });
            for (let key in currentSort) {
                currentSort[key] = false;
            }
            currentSort[data] = true;
        }

        this.setState(() => {
            return {
                data: currentPandas,
                hasSorted: currentSort
            }
        });
    }

    render() {
        return (
            <div className="app">
                <h1>The book of pandas</h1>
                <SearchPanel
                    changeSearchFilter = {this.changeSearchFilter}
                    searchTable = {this.searchTable}/>
                <Table 
                    pandas={this.state.data}
                    pagination = {this.state.pagination}
                    page = {this.state.page}
                    sortTable = {this.sortTable}/>
                <PageChange
                    pandas={this.state.data}
                    page={this.state.page}
                    pagination = {this.state.pagination}
                    nextPage={this.nextPage}
                    prevPage={this.prevPage}/>
            </div>
        )
    }
}