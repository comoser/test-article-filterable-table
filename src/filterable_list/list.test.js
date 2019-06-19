import React from 'react';
import { mount } from 'enzyme';

import { List } from './list';
import { DEFAULT_NUMBER_OF_RESULTS } from '../common/api';
import { ListItem } from './list_item';

const totalResults = 20;
const resultsPerPage = 10;
const currentPage = 1;
const data = [
    {
        id: 1,
        title: 'Title 1',
        completed: true,
    },
    {
        id: 2,
        title: 'Title 2',
        completed: false,
    },
    {
        id: 3,
        title: 'Title 3',
        completed: true,
    },
    {
        id: 4,
        title: 'Title 4',
        completed: true,
    },
    {
        id: 5,
        title: 'Title 5',
        completed: false,
    },
    {
        id: 6,
        title: 'Title 6',
        completed: false,
    },
    {
        id: 7,
        title: 'Title 7',
        completed: false,
    },
    {
        id: 8,
        title: 'Title 8',
        completed: true,
    },
    {
        id: 9,
        title: 'Title 9',
        completed: true,
    },
    {
        id: 10,
        title: 'Title 10',
        completed: true,
    },
    {
        id: 11,
        title: 'Title 11',
        completed: true,
    },
    {
        id: 12,
        title: 'Title 12',
        completed: false,
    },
    {
        id: 13,
        title: 'Title 13',
        completed: true,
    },
    {
        id: 14,
        title: 'Title 14',
        completed: true,
    },
    {
        id: 15,
        title: 'Title 15',
        completed: false,
    },
    {
        id: 16,
        title: 'Title 16',
        completed: false,
    },
    {
        id: 17,
        title: 'Title 17',
        completed: false,
    },
    {
        id: 18,
        title: 'Title 18',
        completed: true,
    },
    {
        id: 19,
        title: 'Title 19',
        completed: true,
    },
    {
        id: 20,
        title: 'Title 20',
        completed: true,
    },
];

describe('List component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(
            <List
                data={data}
                currentPage={currentPage}
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onCurrentPageChange={() => {}}
                onResultsPerPageChange={() => {}}
            />
        );
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('.list .list-item').length).toBe(10);
        expect(component.find('.page-btn').children().children().length).toBe(2);
        expect(component.find('.nor__single-value').children().text()).toBe(String(resultsPerPage));
    });
});
