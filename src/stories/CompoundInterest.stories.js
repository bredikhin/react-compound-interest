import React from 'react'
import CompoundInterest from '../'

export default {
  component: CompoundInterest,
  title: 'CompoundInterest',
}

export const withDefaults = () => <CompoundInterest />
export const withTitle = () => (
  <CompoundInterest title='Compound Interest Calculator' />
)
export const withoutAnnualAddition = () => (
  <CompoundInterest options={{ withAnnualAddition: false }} />
)
