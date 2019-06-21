import React from 'react';
import { mount } from 'enzyme';

import { DEFAULT_NUMBER_OF_RESULTS } from '../../common/api';
import { FilterableList } from '../index';
import { setInternalStateOnComponent } from '../../setupTests';

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
    3: [
        {
            id: 21,
            title: 'Title 21',
            completed: true,
        },
        {
            id: 22,
            title: 'Title 22',
            completed: false,
        },
        {
            id: 23,
            title: 'Title 23',
            completed: true,
        },
        {
            id: 24,
            title: 'Title 24',
            completed: true,
        },
        {
            id: 25,
            title: 'Title 25',
            completed: false,
        },
        {
            id: 26,
            title: 'Title 26',
            completed: false,
        },
        {
            id: 27,
            title: 'Title 27',
            completed: false,
        },
        {
            id: 28,
            title: 'Title 28',
            completed: true,
        },
        {
            id: 29,
            title: 'Title 29',
            completed: true,
        },
        {
            id: 30,
            title: 'Title 30',
            completed: true,
        },
    ],
};

describe('FilterableList component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(<FilterableList />);
        component.setState({
            todos: PAGES[1],
            totalResults: 30,
        }, () => component.update());
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('input#complete').length).toBe(1);
        expect(component.find('input#incomplete').length).toBe(1);
        expect(component.find('.list .list-item h3').length).toBe(10);
        expect(component.find('a.page-btn').length).toBe(3);
        expect(component.find('div.nor__single-value').text()).toBe(String(DEFAULT_NUMBER_OF_RESULTS));
    });

    test('it changes the results according to the selected filters', () => {
        let listItemNodesStatus = component.find('.list .list-item p');
        let joinedStatus = '';
        listItemNodesStatus.forEach((pNode) => {
            joinedStatus += `${pNode.text()}, `;
        });
        expect(joinedStatus.includes('COMPLETED') && joinedStatus.includes('NOT COMPLETED')).toBe(true);
        setInternalStateOnComponent(
            component,
            {
                completeFilter: true,
                incompleteCheckboxValue: false,
                todos: PAGES[1].filter(todo => todo.completed === true),
            }
        );
        listItemNodesStatus = component.find('.list .list-item p');
        joinedStatus = '';
        listItemNodesStatus.forEach((pNode) => {
            joinedStatus += `${pNode.text()}, `;
        });
        expect(joinedStatus.includes('NOT COMPLETED')).toBe(false);
        expect(joinedStatus.includes('COMPLETED')).toBe(true);
    });

    test('it changes results per page correctly', () => {
        expect(component.find('a.page-btn').length).toBe(3);
        expect(component.find('div.nor__single-value').text()).toBe(String(DEFAULT_NUMBER_OF_RESULTS));
        expect(component.find('.list .list-item h3').length).toBe(10);
        setInternalStateOnComponent(
            component,
            {
                todos: [...PAGES[1], ...PAGES[2], ...PAGES[3]],
                resultsPerPage: 50,
            }
        );
        expect(component.find('a.page-btn').length).toBe(1);
        expect(component.find('div.nor__single-value').text()).toBe('50');
        expect(component.find('.list .list-item h3').length).toBe(30);
    });

    test('it changes page number correctly', () => {
        expect(component.find('a.page-btn').at(0).html().includes('active')).toBe(true);
        expect(component.find('.list .list-item h3').at(0).text()).toBe('Title 1');
        setInternalStateOnComponent(
            component,
            {
                todos: PAGES[2],
                currentPage: 2,
            }
        );
        expect(component.find('a.page-btn').at(0).html().includes('active')).toBe(false);
        expect(component.find('a.page-btn').at(1).html().includes('active')).toBe(true);
        expect(component.find('.list .list-item h3').at(0).text()).toBe('Title 11');
        setInternalStateOnComponent(
            component,
            {
                todos: PAGES[3],
                currentPage: 3,
            }
        );
        expect(component.find('a.page-btn').at(0).html().includes('active')).toBe(false);
        expect(component.find('a.page-btn').at(1).html().includes('active')).toBe(false);
        expect(component.find('a.page-btn').at(2).html().includes('active')).toBe(true);
        expect(component.find('.list .list-item h3').at(1).text()).toBe('Title 22');
    });
});
