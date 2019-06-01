import React from 'react';
import { WithStyles } from '@material-ui/core/styles';

export interface CompoundInterestInputData {
  principal: number;
  interest: number;
  annualAddition: number;
  timesPerYear: number;
  numberOfYears: number;
}

export interface CompoundInterestStyledProps {
  title?: string,
  options?: {
    withAnnualAddition: boolean,
  },
  width?: number,
  height?: number
}

export interface CompoundInterestProps {
  title: string
}

export interface CompoundEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {}

declare class CompoundInterest extends React.PureComponent<CompoundInterestProps, any> {
}

declare module 'compound-interest' {
}

export default CompoundInterest;
