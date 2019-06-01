import React from 'react';
import { storiesOf } from '@storybook/react';
import CompoundInterest from '../lib';

storiesOf('CompoundInterest', module)
  .add('with title', () => (
    <CompoundInterest title="Compound Interest Calculator" />
  ))
  .add('without title', () => (
    <CompoundInterest />
  ))
  .add('without annual addition', () => (
    <CompoundInterest
      title="Basic Compound Interest Calculator"
      options={{withAnnualAddition: false}}
    />
  ))
  .add('with width and height set', () => (
    <CompoundInterest
      width={300}
      height={600}
    />
  ));
