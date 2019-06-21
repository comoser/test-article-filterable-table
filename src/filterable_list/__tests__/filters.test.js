import React from 'react';
import { mount } from 'enzyme';

import { CHECKBOXES, Filters } from '../filters';
import { callPropFunctionOnComponent } from '../../setupTests';

describe('Filters component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(
            <Filters
                completeCheckboxValue={true}
                incompleteCheckboxValue={true}
                onCompleteFilterChange={() => {}}
            />
        );
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('input#complete').length).toBe(1);
        expect(component.find('input#incomplete').length).toBe(1);
    });

    test('it has both filters on by default', () => {
        expect(component.find('#complete').at(0).prop('checked')).toBe(true);
        expect(component.find('#incomplete').at(0).prop('checked')).toBe(true);
    });

    test('it changes the values correctly when checking a filter', () => {
        expect(component.find('#complete').at(0).prop('checked')).toBe(true);
        component.setProps({
            onCompleteFilterChange: (checkbox, isChecked) => {
                component.setProps({
                    [checkbox]: isChecked,
                });
            }
        });
        callPropFunctionOnComponent(component, 'onCompleteFilterChange', [CHECKBOXES.COMPLETED, false]);
        expect(component.find('#complete').at(0).prop('checked')).toBe(false);
    });
});
