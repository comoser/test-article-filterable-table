import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DEFAULT_NUMBER_OF_RESULTS, DEFAULT_PAGE } from '../common/api';
import { calculateNumberOfPages } from './util';

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

const Button = styled.a`
  border: 1px solid #c0c0c0;
  outline: none;
  padding: 5px;
  margin: 0 1px;
  border-radius: 3px;
  min-width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 200ms;
  &:link, &:visited {
    color: #555;
  }
  &:hover, &:active {
    background-color: #c0c0c0;
  }
  &.active {
    border: 1px solid #9c9c9c;
    background-color: #9e9e9e;
  }
`;

export class Pagination extends Component {
    renderPageButtons = () => {
        const {
            totalResults, resultsPerPage,
            onCurrentPageChange, currentPage,
        } = this.props;
        const numberOfButtons = calculateNumberOfPages(totalResults, resultsPerPage);

        if (numberOfButtons === 0) return null;
        const buttons = [];
        for (let i = 1, length = numberOfButtons; i <= length; i += 1) {
            buttons.push(
                <Button
                    key={i}
                    href="#"
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => onCurrentPageChange(i)}
                >
                    {i}
                </Button>
            );
        }
        return buttons;
    };

    render() {
        return (
            <PaginationWrapper>
                {this.renderPageButtons()}
            </PaginationWrapper>
        );
    }
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalResults: PropTypes.number,
    resultsPerPage: PropTypes.number,
    onCurrentPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    currentPage: DEFAULT_PAGE,
    totalResults: 0,
    resultsPerPage: DEFAULT_NUMBER_OF_RESULTS,
    onCurrentPageChange: () => {},
};
