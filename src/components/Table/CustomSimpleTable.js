import React from 'react';
import PropTypes from 'prop-types';

import {
    Table,
} from 'reactstrap';

function SimpleTable(props) {
    const { data, headers, mapData } = props;

    const tableRows = data.map((rowObj, i) => {
        const rowData = mapData(rowObj,i);
        return <tr key={i}>{rowData.map((d, j) => <td className="align-middle" key={j}>{d}</td>)}</tr>;
    });

    return (
        <Table hover >
            <thead>
                <tr>
                    <td className="align-middle" style={{font:"bold", fontSize:"20px"}}>{headers[0]}{headers[1]}{headers[2]}</td>
                    {/* <td className="align-middle"></td>  */}
                </tr>
            </thead>
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
        PropTypes.node,
    ])).isRequired,
};

export default SimpleTable;
