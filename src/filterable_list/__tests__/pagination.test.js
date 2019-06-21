import React from 'react';
import { mount } from 'enzyme';

import { Pagination } from '../pagination';
import { DEFAULT_NUMBER_OF_RESULTS, DEFAULT_PAGE } from '../../common/api';
import { callPropFunctionOnComponent } from '../../setupTests';

describe('Pagination component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(
            <Pagination
                currentPage={DEFAULT_PAGE}
                totalResults={200}
                resultsPerPage={DEFAULT_NUMBER_OF_RESULTS}
                onCurrentPageChange={() => {}}
            />
        );
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('a.page-btn').length).toBe(20);
        expect(component.find('a.active').length).toBe(1);
    });

    test('it sets the active page correctly', () => {
        expect(component.find('a.page-btn').at(0).html().includes('active')).toBe(true);
    });

    test('it changes the active page correctly', () => {
        component.setProps({
            onCurrentPageChange: (currentPage) => {
                component.setProps({ currentPage });
            }
        });
        expect(component.find('a.page-btn').at(0).html().includes('active')).toBe(true);
        callPropFunctionOnComponent(component, 'onCurrentPageChange', [2]);
        expect(component.find('a.page-btn').at(0).html().includes('active')).toBe(false);
        expect(component.find('a.page-btn').at(1).html().includes('active')).toBe(true);
    });
});
