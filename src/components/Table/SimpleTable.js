import React from 'react';
import PropTypes from 'prop-types';

import {
    Table,
} from 'reactstrap';

function SimpleTable(props) {
    const { data, headers, mapData } = props;

    const tableRows = data.map((rowObj, i) => {
        const rowData = mapData(rowObj);
        return <tr key={i}>{rowData.map((d, j) => <td key={j}>{d}</td>)}</tr>;
    });

    return (
        <Table hover>
            <tbody>
                {tableRows}
            </tbody> 
        </Table>
    );
}

SimpleTable.propTypes = {
    mapData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ])).isRequired,
};

export default SimpleTable;
