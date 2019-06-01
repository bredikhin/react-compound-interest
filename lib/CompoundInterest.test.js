import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render } from 'enzyme';
import CompoundInterest from './CompoundInterest';
Enzyme.configure({ adapter: new Adapter() });
describe('Compound Interest Calculator', function () {
    it('should render without props', function () {
        expect(shallow(React.createElement(CompoundInterest, null))).toMatchSnapshot();
    });
    it('should render without annual addition', function () {
        var wrapper = shallow(React.createElement(CompoundInterest, { options: { withAnnualAddition: false } }));
        expect(wrapper).toMatchSnapshot();
    });
    it('should render the title', function () {
        var title = 'Test Title';
        var component = render(React.createElement(CompoundInterest, { title: title }));
        expect(component.find('header').text()).toBe(title);
    });
});
//# sourceMappingURL=CompoundInterest.test.js.map