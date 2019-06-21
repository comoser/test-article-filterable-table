import React, { Component } from 'react';

import { Wrapper } from '../common/wrapper';
import { Filters } from './filters';
import { List } from './list';
import { DEFAULT_NUMBER_OF_RESULTS, DEFAULT_PAGE, TodosAPI } from '../common/api';

const INITIAL_STATE = {
    todos: [],
    currentPage: DEFAULT_PAGE,
    totalResults: 0,
    completeFilter: null,
    completeCheckboxValue: true,
    incompleteCheckboxValue: true,
    resultsPerPage: DEFAULT_NUMBER_OF_RESULTS,
};

export class FilterableList extends Component {
    state = INITIAL_STATE;

    componentDidMount() {
        this.requestTodosFromAPI();
    }

    onResultsPerPageChange = (resultsPerPage) => {
        const { resultsPerPage: previousResultsPerPage, completeFilter } = this.state;
        this.setState({
            currentPage: DEFAULT_PAGE,
            resultsPerPage,
        }, () => {
            if (previousResultsPerPage !== resultsPerPage) {
                this.requestTodosFromAPI(DEFAULT_PAGE, resultsPerPage, completeFilter);
            }
        });
    };

    onCurrentPageChange = (selectedPage) => {
        const { currentPage, resultsPerPage, completeFilter } = this.state;
        this.setState({ currentPage: selectedPage }, () => {
            if (currentPage !== selectedPage) {
                this.requestTodosFromAPI(selectedPage, resultsPerPage, completeFilter);
            }
        });
    };

    onCompleteFilterChange = (checkbox, isChecked) => {
        const { resultsPerPage } = this.state;
        let completeFilterValue;
        const checkboxesCurrentState = this.getCheckboxesCurrentState(checkbox, isChecked);
        const { completeCheckboxValue: complete, incompleteCheckboxValue: incomplete } = checkboxesCurrentState;

        if ((complete && incomplete) || (!complete && !incomplete)) completeFilterValue = null;
        else if (complete && !incomplete) completeFilterValue = true;
        else if (!complete && incomplete) completeFilterValue = false;

        this.setState({
            [checkbox]: isChecked,
            currentPage: DEFAULT_PAGE,
            completeFilter: completeFilterValue,
        }, () => {
            this.requestTodosFromAPI(DEFAULT_PAGE, resultsPerPage, completeFilterValue);
        });
    };

    requestTodosFromAPI = async (page = DEFAULT_PAGE, limit = DEFAULT_NUMBER_OF_RESULTS, completeFilter = null) => {
        const todosResponse = await TodosAPI.findAll(page, limit, completeFilter);
        const todos = await todosResponse.json();
        const totalResults = Number(todosResponse.headers.get('x-total-count'));

        this.setState({
            todos,
            totalResults,
        });
    };

    getCheckboxesCurrentState = (checkbox, isChecked) => {
        const { completeCheckboxValue, incompleteCheckboxValue } = this.state;

        let checkboxesValues = {
            completeCheckboxValue,
            incompleteCheckboxValue,
        };
        checkboxesValues[checkbox] = isChecked;

        return checkboxesValues;
    };

    render() {
        const {
            todos, totalResults,
            resultsPerPage, currentPage,
            completeCheckboxValue,
            incompleteCheckboxValue,
        } = this.state;

        return (
            <Wrapper className="wrapper">
                <Filters
                    completeCheckboxValue={completeCheckboxValue}
                    incompleteCheckboxValue={incompleteCheckboxValue}
                    onCompleteFilterChange={this.onCompleteFilterChange}
                />
                <List
                    data={todos}
                    currentPage={currentPage}
                    totalResults={totalResults}
                    resultsPerPage={resultsPerPage}
                    onCurrentPageChange={this.onCurrentPageChange}
                    onResultsPerPageChange={this.onResultsPerPageChange}
                />
            </Wrapper>
        );
    }
}
