import React from 'react';
import { storiesOf } from '@storybook/react';
import CompoundInterest from '../lib';

storiesOf('CompoundInterest', module)
  .add('with title', () => (
    <CompoundInterest title="Compound Interest Calculator" />
  ));
