import React from 'react';
import { mount } from 'enzyme';

import { NumberOfResultsPicker, OPTIONS } from '../number_of_results_picker';
import { DEFAULT_NUMBER_OF_RESULTS } from '../../common/api';
import { callPropFunctionOnComponent } from '../../setupTests';

describe('NumberOfResultsPicker component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(
            <NumberOfResultsPicker
                resultsPerPage={DEFAULT_NUMBER_OF_RESULTS}
                onResultsPerPageChange={() => {}}
            />
        );
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('div.nor__single-value').text()).toBe(String(DEFAULT_NUMBER_OF_RESULTS));
    });

    test('it renders the 3 available options of number of results per page when pressed', () => {
        component.find('div.nor__dropdown-indicator').simulate('mouseDown', { button: 0 });
        expect(component.find('div.nor__option').length).toBe(3);
        const pNodes = component.find('div.nor__option');
        pNodes.forEach((pNode) => {
            expect(
                OPTIONS
                    .map(({ value }) => value)
                    .includes(Number(pNode.text()))
            ).toBe(true);
        });
    });

    test('it changes the number of results per page correctly', () => {
        component.setProps({
            onResultsPerPageChange: (resultsPerPage) => {
                component.setProps({ resultsPerPage });
            }
        });
        expect(component.find('div.nor__single-value').text()).toBe(String(DEFAULT_NUMBER_OF_RESULTS));
        callPropFunctionOnComponent(component, 'onResultsPerPageChange', [50]);
        expect(component.find('div.nor__single-value').text()).toBe('50');
    });
});
