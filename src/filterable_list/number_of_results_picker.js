import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';

import { DEFAULT_NUMBER_OF_RESULTS } from '../common/api';

const PickerWrapper = styled.div`
  width: 100px;
`;

export const OPTIONS = [
    {
        value: 10,
        label: '10',
    },
    {
        value: 50,
        label: '50',
    },
    {
        value: 100,
        label: '100',
    },
];

export class NumberOfResultsPicker extends Component {
    getPickerOptions = () => OPTIONS;

    render() {
        const { resultsPerPage, onResultsPerPageChange } = this.props;

        return (
            <PickerWrapper>
                <Select
                    classNamePrefix="nor"
                    value={OPTIONS.find(option => option.value === resultsPerPage)}
                    options={this.getPickerOptions()}
                    onChange={onResultsPerPageChange}
                />
            </PickerWrapper>
        );
    }
}

NumberOfResultsPicker.propTypes = {
    resultsPerPage: PropTypes.number,
    onResultsPerPageChange: PropTypes.func,
};

NumberOfResultsPicker.defaultProps = {
    resultsPerPage: DEFAULT_NUMBER_OF_RESULTS,
    onResultsPerPageChange: () => {},
};
