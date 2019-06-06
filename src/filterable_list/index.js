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

    onCompleteFilterChange = (completeFilter) => {
        const { currentPage, resultsPerPage } = this.state;
        this.setState({
            currentPage: DEFAULT_PAGE,
            completeFilter,
        }, () => {
            this.requestTodosFromAPI(DEFAULT_PAGE, resultsPerPage, completeFilter);
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

    render() {
        const {
            todos, totalResults,
            resultsPerPage, currentPage,
        } = this.state;

        return (
            <Wrapper className="wrapper">
                <Filters onCompleteFilterChange={this.onCompleteFilterChange} />
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
