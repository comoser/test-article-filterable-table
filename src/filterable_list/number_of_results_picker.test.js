import React from 'react';
import { mount } from 'enzyme';

import { NumberOfResultsPicker, OPTIONS } from './number_of_results_picker';
import { DEFAULT_NUMBER_OF_RESULTS } from '../common/api';

describe('NumberOfResultsPicker component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(<NumberOfResultsPicker resultsPerPage={DEFAULT_NUMBER_OF_RESULTS} onResultsPerPageChange={() => {}} />);
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('.nor__single-value').children().text()).toBe(String(DEFAULT_NUMBER_OF_RESULTS));
    });

    test('it renders the 3 available options of number of results per page when pressed', () => {
        component.find('.nor__dropdown-indicator').at(1).simulate('mouseDown', { button: 0 });
        expect(component.find('.nor__option').children().length).toBe(3);
        const pNodes = component.find('.nor__option').children();
        pNodes.forEach((pNode) => {
            expect(OPTIONS.map(o => o.value).includes(Number(pNode.text()))).toBe(true);
        });
    });
});
