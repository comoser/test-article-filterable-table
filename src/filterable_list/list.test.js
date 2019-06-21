import React from 'react';
import { mount } from 'enzyme';

import { List } from './list';
import { DEFAULT_NUMBER_OF_RESULTS } from '../common/api';
import { callPropFunctionOnComponent } from '../setupTests';

const totalResults = 20;
const resultsPerPage = DEFAULT_NUMBER_OF_RESULTS;
const currentPage = 1;

const PAGES = {
    1: [
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
    ],
    2: [
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
    ],
};

describe('List component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(
            <List
                data={PAGES[1]}
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
        expect(component.find('.list .list-item h3').length).toBe(10);
        expect(component.find('a.page-btn').length).toBe(2);
        expect(component.find('div.nor__single-value').text()).toBe(String(resultsPerPage));
    });

    test('it changes page correctly', () => {
        component.setProps({
            onCurrentPageChange: (currentPage) => {
                component.setProps({ currentPage });
                component.setProps({ data: PAGES[currentPage] });
            }
        });
        expect(component.find('.list .list-item h3').at(0).text()).toBe('Title 1');
        expect(component.find('.pagination a.page-btn').at(0).html().includes('active')).toBe(true);
        callPropFunctionOnComponent(component, 'onCurrentPageChange', [2]);
        expect(component.find('.pagination a.page-btn').at(0).html().includes('active')).toBe(false);
        expect(component.find('.pagination a.page-btn').at(1).html().includes('active')).toBe(true);
        expect(component.find('.list .list-item h3').at(0).text()).toBe('Title 11');
    });

    test('it changes the number of results per page correctly', () => {
        component.setProps({
            onResultsPerPageChange: (resultsPerPage) => {
                component.setProps({ resultsPerPage });
                component.setProps({ data: [...PAGES[1], ...PAGES[2]] });
            }
        });
        expect(component.find('div.nor__single-value').text()).toBe(String(DEFAULT_NUMBER_OF_RESULTS));
        expect(component.find('.list .list-item h3').length).toBe(10);
        callPropFunctionOnComponent(component, 'onResultsPerPageChange', [50]);
        expect(component.find('div.nor__single-value').text()).toBe('50');
        expect(component.find('.list .list-item h3').length).toBe(20);
    });
});
