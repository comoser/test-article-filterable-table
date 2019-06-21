import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const callPropFunctionOnComponent = (component, propName, paramsArray) => {
    if (component.prop(propName)) {
        component.prop(propName)(...paramsArray);
    }
};

export const setInternalStateOnComponent = (component, newState) => {
    component.setState(newState, () => component.update());
};
