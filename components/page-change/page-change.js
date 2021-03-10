import React from 'react';

import './page-change.css'

const PageChange = ({pandas, page, pagination, nextPage, prevPage}) => {

    let maxPage = Math.ceil(pandas.length / pagination);

    return (
        <div className="pagination">
            <button onClick={() => prevPage()}>Prev</button>
            <div className="pagination-text">Page {page + 1} of {maxPage}</div>
            <button onClick={() => nextPage()}>Next</button>
        </div>
    )
}

export default PageChange;