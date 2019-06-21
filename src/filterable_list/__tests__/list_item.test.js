import React from 'react';
import { mount } from 'enzyme';

import { ListItem } from '../list_item';

const mockedCorrectData = {
    id: 1,
    title: 'Task 1',
    userId: 3,
    completed: true,
};

describe('ListItem component validation', () => {
    test('it renders correctly with correct data', () => {
        const component = mount(<ListItem data={mockedCorrectData} />);
        expect(component.isEmptyRender()).toBe(false);
        expect(component.find('h3').text()).toBe('Task 1');
        expect(component.find('p').text()).toBe('COMPLETED');
    });

    test('it renders correctly with no data', () => {
        const component = mount(<ListItem data={null} />);
        expect(component.isEmptyRender()).toBe(true);
    });
});
