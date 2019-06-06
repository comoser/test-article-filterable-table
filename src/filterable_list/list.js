import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ListItem } from './list_item';
import { Pagination } from './pagination';
import { NumberOfResultsPicker } from './number_of_results_picker';
import { DEFAULT_NUMBER_OF_RESULTS, DEFAULT_PAGE } from '../common/api';

const ListWrapper = styled.div`
  margin: 20px 80px;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const PaginationWrapper = styled.div`
  margin: 20px 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export class List extends Component {
    onResultsPerPageChange = ({ value: resultsPerPage }) => {
        const { onResultsPerPageChange } = this.props;

        onResultsPerPageChange(resultsPerPage);
    };

    onCurrentPageChange = (selectedPage) => {
        const { onCurrentPageChange } = this.props;

        onCurrentPageChange(selectedPage);
    };

    renderListItems = () => {
        const { data } = this.props;

        return data.map(listItemData => (
                <ListItem
                    key={listItemData.id}
                    data={listItemData}
                />
            )
        );
    };

    render() {
        const { totalResults, resultsPerPage, currentPage } = this.props;

        return (
            <Fragment>
                <ListWrapper className="list">
                    {this.renderListItems()}
                </ListWrapper>
                <PaginationWrapper className="pagination">
                    <NumberOfResultsPicker
                        resultsPerPage={resultsPerPage}
                        onResultsPerPageChange={this.onResultsPerPageChange}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onCurrentPageChange={this.onCurrentPageChange}
                    />
                </PaginationWrapper>
            </Fragment>
        );
    }
}

List.propTypes = {
    data: PropTypes.array,
    currentPage: PropTypes.number,
    totalResults: PropTypes.number,
    resultsPerPage: PropTypes.number,
    onCurrentPageChange: PropTypes.func,
    onResultsPerPageChange: PropTypes.func,
};

List.defaultProps = {
    data: [],
    currentPage: DEFAULT_PAGE,
    totalResults: 0,
    resultsPerPage: DEFAULT_NUMBER_OF_RESULTS,
    onCurrentPageChange: () => {},
    onResultsPerPageChange: () => {},
};
