import React from 'react';
import PropTypes from 'prop-types';

import LinkButton from 'components/Button/LinkButton';
import SimpleTable from './SimpleTable';

function EditTable(props) {
    const HEADERS = props.header;

    const mapDataToArray = row => ([
        props.mapColumn(row),
        <LinkButton name="Edit" to={`${props.editpath}/${row.id}`} />,
    ]);

    return <SimpleTable headers={HEADERS} data={props.data} mapData={mapDataToArray} />;
}

EditTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    header: PropTypes.arrayOf(PropTypes.string).isRequired,
    editpath: PropTypes.string.isRequired,
    mapColumn: PropTypes.func.isRequired,
};

export default React.memo(EditTable);
