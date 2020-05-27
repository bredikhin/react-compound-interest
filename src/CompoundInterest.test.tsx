import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render } from 'enzyme';
import CompoundInterest from './CompoundInterest';

Enzyme.configure({ adapter: new Adapter() });

describe('Compound Interest Calculator', () => {
  it('should render without props', () => {
    expect(shallow(<CompoundInterest />)).toMatchSnapshot();
  });

  it('should render without annual addition', () => {
    const wrapper = shallow(
      <CompoundInterest options={{ withAnnualAddition: false }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the title', () => {
    const title = 'Test Title';
    const component = render(<CompoundInterest title={title} />);
    expect(component.find('header').text()).toBe(title);
  });
});
