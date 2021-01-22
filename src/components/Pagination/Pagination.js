import React from 'react';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const pagination = (props) => {
    return (
        <div className="section">
            <div className="container">
                <div className="row w-100">
                    <div className="d-flex justify-content-end w-100">
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink previous onClick={props.prevPage} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>
                                    {props.start} - {props.end}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next onClick={props.nextPage} />
                            </PaginationItem>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

pagination.propTypes = {
    prevPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
};

export default pagination;
