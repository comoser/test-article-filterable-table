import React from 'react';
import { mount } from 'enzyme';

import { Filters } from './filters';

describe('Filters component validation', () => {
    let component = null;

    beforeEach(() => {
        component = mount(<Filters onCompleteFilterChange={() => {}} />);
    });

    test('it renders correctly', () => {
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('input#complete').length).toBe(1);
        expect(component.find('input#incomplete').length).toBe(1);
    });

    test('it has both filters on by default', () => {
        expect(component.state()).toEqual({
            complete: true,
            incomplete: true,
        });
        expect(component.find('#complete').at(0).prop('checked')).toBe(true);
        expect(component.find('#incomplete').at(0).prop('checked')).toBe(true);
    });

    test('it changes the state correctly when checking a filter', () => {
        component.setState({ complete: false }, () => component.update());
        expect(component.find('#complete').at(0).prop('checked')).toBe(false);
        expect(component.state()).toEqual({
            complete: false,
            incomplete: true,
        });
    });
});
