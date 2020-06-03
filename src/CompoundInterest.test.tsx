import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render } from 'enzyme';
import CompoundInterest, { compound } from './CompoundInterest';

Enzyme.configure({ adapter: new Adapter() });

const sample = {
  input: {
    principal: 100,
    interest: 10,
    annualAddition: 100,
    timesPerYear: 12,
    numberOfYears: 10
  },
  result: 199197
};

describe('Compound Interest Calculator', () => {
  it('should calculate the result properly', () => {
    expect(Math.round(compound(sample.input) * 100)).toEqual(sample.result);
  });

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
