import React, { Component } from 'react';
import styled from 'styled-components';
import Checkbox from 'react-simple-checkbox';
import PropTypes from 'prop-types';

const FiltersWrapper = styled.div`
  margin: 20px 80px;
  padding: 10px;
  background-color: #e0e0e0;
  display: flex;
  height: 40px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  .Checkbox {
    top: 0 !important;
  }
  label {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const CHECKBOXES = {
    COMPLETED: 'completeCheckboxValue',
    NOT_COMPLETED: 'incompleteCheckboxValue',
};

export class Filters extends Component {
    onCheckboxChange = (checkbox, isChecked) => {
        const { onCompleteFilterChange } = this.props;

        onCompleteFilterChange(checkbox, isChecked);
    };

    render() {
        const { completeCheckboxValue, incompleteCheckboxValue } = this.props;

        return (
            <FiltersWrapper className="filters">
                <CheckboxWrapper>
                    <Checkbox
                        id="complete"
                        size={3}
                        color="#7D43FF"
                        checked={completeCheckboxValue}
                        onChange={isChecked => this.onCheckboxChange(CHECKBOXES.COMPLETED, isChecked)}
                    />
                    <label htmlFor="complete">Completed</label>
                </CheckboxWrapper>
                <CheckboxWrapper>
                    <Checkbox
                        id="incomplete"
                        size={3}
                        color="#7D43FF"
                        checked={incompleteCheckboxValue}
                        onChange={isChecked => this.onCheckboxChange(CHECKBOXES.NOT_COMPLETED, isChecked)}
                    />
                    <label htmlFor="incomplete">Not completed</label>
                </CheckboxWrapper>
            </FiltersWrapper>
        );
    }
}

Filters.propTypes = {
    completeCheckboxValue: PropTypes.bool,
    incompleteCheckboxValue: PropTypes.bool,
    onCompleteFilterChange: PropTypes.func,
};

Filters.defaultProps = {
    completeCheckboxValue: true,
    incompleteCheckboxValue: true,
    onCompleteFilterChange: () => {},
};
