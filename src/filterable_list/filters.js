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

const CHECKBOXES = {
    COMPLETED: 'complete',
    NOT_COMPLETED: 'incomplete',
};

const INITIAL_STATE = {
    complete: true,
    incomplete: true,
};

export class Filters extends Component {
    state = INITIAL_STATE;

    onCheckboxChange = (checkbox, isChecked) => {
        const { onCompleteFilterChange } = this.props;

        this.setState({
            [checkbox]: isChecked,
        }, () => {
            const { complete, incomplete } = this.state;
            if ((complete && incomplete) || (!complete && !incomplete)) onCompleteFilterChange(null);
            else if (complete && !incomplete) onCompleteFilterChange(true);
            else if (!complete && incomplete) onCompleteFilterChange(false);
        });
    };

    render() {
        const { complete, incomplete } = this.state;

        return (
            <FiltersWrapper className="filters">
                <CheckboxWrapper>
                    <Checkbox
                        id="complete"
                        size={3}
                        color="#7D43FF"
                        checked={complete}
                        onChange={isChecked => this.onCheckboxChange(CHECKBOXES.COMPLETED, isChecked)}
                    />
                    <label htmlFor="complete">Completed</label>
                </CheckboxWrapper>
                <CheckboxWrapper>
                    <Checkbox
                        id="incomplete"
                        size={3}
                        color="#7D43FF"
                        checked={incomplete}
                        onChange={isChecked => this.onCheckboxChange(CHECKBOXES.NOT_COMPLETED, isChecked)}
                    />
                    <label htmlFor="incomplete">Not completed</label>
                </CheckboxWrapper>
            </FiltersWrapper>
        );
    }
}

Filters.propTypes = {
    onCompleteFilterChange: PropTypes.func,
};

Filters.defaultProps = {
    onCompleteFilterChange: () => {},
};
