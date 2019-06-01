import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dinero from 'dinero.js';
import { css, jsx } from '@emotion/core';
import { width, height } from 'styled-system';
import {
  CompoundInterestInputData,
  CompoundInterestStyledProps,
  CompoundEvent
} from '../index';

export const compound = ({
  principal,
  interest,
  annualAddition,
  timesPerYear,
  numberOfYears
}: CompoundInterestInputData): number => {
  const k = 1 + interest / 100 / timesPerYear;

  return (
    principal * Math.pow(k, numberOfYears) +
    (annualAddition * (Math.pow(k, numberOfYears + 1) - k)) / (k - 1)
  );
};

const Header: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <header>
    <Typography
      variant="subtitle1"
      css={css`
        text-transform: 'uppercase';
      `}
    >
      {children}
    </Typography>
  </header>
);

const Field: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <Grid
    item
    css={css`
      flex: 1;
      display: 'flex';
      flex-direction: 'column';
      justifycontent: 'center';
    `}
  >
    {children}
  </Grid>
);

const CompoundInterest = ({
  title,
  options = {
    withAnnualAddition: true
  },
  width,
  height
}: CompoundInterestStyledProps) => {
  const { withAnnualAddition } = options;
  const { useState, useEffect, useMemo } = React;
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [annualAddition, setAnnualAddition] = withAnnualAddition
    ? useState('')
    : ['0', () => null];
  const [timesPerYear, setTimesPerYear] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('');
  const [futureAmount, setFutureAmount] = useState('');
  const futureMemo = useMemo(
    () =>
      compound({
        principal: parseFloat(principal),
        interest: parseFloat(interest),
        annualAddition: parseFloat(annualAddition) || 0,
        timesPerYear: parseInt(timesPerYear),
        numberOfYears: parseInt(numberOfYears)
      }).toString() || '',
    [principal, interest, annualAddition, timesPerYear, numberOfYears]
  );

  useEffect(() => {
    setFutureAmount(futureMemo);
  }, [futureMemo]);

  return (
    <Grid
      container
      direction="column"
      css={css`
        min-height: '100%';
        display: 'flex';
        flex-direction: 'column';
        padding: '2em';
        &&& {
          ${width}
          ${height}
        }
      `}
    >
      {title && (
        <Field>
          <Header>{title}</Header>
        </Field>
      )}
      <Field>
        <TextField
          label="Principal"
          id="principal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          value={principal}
          onChange={(e: CompoundEvent) => setPrincipal(e.currentTarget.value)}
        />
      </Field>
      <Field>
        <TextField
          label="Interest"
          id="interest"
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>
          }}
          value={interest}
          onChange={(e: CompoundEvent) => setInterest(e.currentTarget.value)}
        />
      </Field>
      {withAnnualAddition && (
        <Field>
          <TextField
            label="Annual addition"
            id="annual-addition"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            value={annualAddition}
            onChange={(e: CompoundEvent) =>
              setAnnualAddition(e.currentTarget.value)
            }
          />
        </Field>
      )}
      <Field>
        <TextField
          label="Times per year"
          id="times-per-year"
          value={timesPerYear}
          onChange={(e: CompoundEvent) =>
            setTimesPerYear(e.currentTarget.value)
          }
        />
      </Field>
      <Field>
        <TextField
          label="Number of years"
          id="number-of-years"
          value={numberOfYears}
          onChange={(e: CompoundEvent) =>
            setNumberOfYears(e.currentTarget.value)
          }
        />
      </Field>
      <Field>
        <Typography
          variant="h1"
          css={css`
            font-size: '10vw';
          `}
        >
          {Dinero({
            amount: Math.round((parseFloat(futureAmount) || 0) * 100)
          }).toFormat('$0,0.00')}
        </Typography>
      </Field>
    </Grid>
  );
};

export default React.memo(CompoundInterest);
