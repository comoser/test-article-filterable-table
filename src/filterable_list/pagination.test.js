import React from 'react';
import { mount } from 'enzyme';

import { Pagination } from './pagination';
import { DEFAULT_NUMBER_OF_RESULTS, DEFAULT_PAGE } from '../common/api';

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
        expect(component.find('.page-btn').children().children().length).toBe(20);
        expect(component.find('.active').children().children().length).toBe(1);
    });
});
