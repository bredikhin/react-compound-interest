import * as React from 'react';
import { View, FlatList, Text, TextInput, ListRenderItem, StyleSheet } from 'react-native-web';
import Dinero from 'dinero.js';
import {
  CompoundInterestInputData,
  CompoundInterestStyledProps,
  CompoundInterestFieldProps,
  CompoundInterestFlatListItem,
} from './typings';

// Core formula
export const compound = ({
  principal,
  interest,
  annualAddition,
  timesPerYear,
  numberOfYears
}: CompoundInterestInputData): number => {
  const k = 1 + interest / 100 / timesPerYear;
  const l = numberOfYears * timesPerYear;

  return (
    principal * Math.pow(k, l) +
    (((annualAddition * (Math.pow(k, l) - 1)) / (k - 1)) * k) / timesPerYear
  );
};

// Styling
const styles = StyleSheet.create({
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    color: 'black',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  resultContainer: {
    alignItems: 'flex-end'
  },
  resultLabel: {
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    fontSize: 24,
  },
  result: {
    textAlign: 'right',
    fontSize: 24,
  },
  container: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
  }
});

// Subcomponents
const Header: React.SFC<{ children: React.ReactNode }> = ({ children }) => (
  <header>
      {children}
  </header>
);

const Field: React.SFC<CompoundInterestFieldProps> = ({ label, value, onChange }) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} value={value} onChangeText={onChange} />
  </View>
);

// Main component
const renderField: ListRenderItem<CompoundInterestFlatListItem> = ({ item }) => {
  let fields = null;
  if (typeof item === 'function') {
    const res = item();
    if (res && 'label' in res) {
      fields = res;
    } else {
      return res;
    }
  } else {
    fields = item;
  }

  const { label, value, onChange } = fields;

  return (
    <Field label={label} value={value} onChange={onChange} />
  );
};

const CompoundInterest = ({
  title,
  options = {
    withAnnualAddition: true
  }
}: CompoundInterestStyledProps) => {
  // Options
  const { withAnnualAddition } = options;

  // State
  const { useState, useEffect, useMemo } = React;
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState('');
  const [annualAddition, setAnnualAddition] = useState('');
  const [timesPerYear, setTimesPerYear] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('');
  const [futureAmount, setFutureAmount] = useState('');

  // Calculations
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

  // Form fields
  const fields = {
    title: () => title ? <Header>{title}</Header> : null,
    principal: {
      label: 'Principal',
      value: principal,
      onChange: (value: string) => setPrincipal(value)
    },
    interest: {
      label: 'Interest',
      value: interest,
      onChange: (value: string) => setInterest(value)
    },
    annualAddition: () => withAnnualAddition ? {
      label: 'Annual addition',
      value: annualAddition,
      onChange: (value: string) => setAnnualAddition(value)
    } : null,
    timesPerYear: {
      label: 'Times per year',
      value: timesPerYear,
      onChange: (value: string) => setTimesPerYear(value)
    },
    numberOfYears: {
      label: 'Number of years',
      value: numberOfYears,
      onChange: (value: string) => setNumberOfYears(value)
    },
    futureAmount: () => futureAmount ? (
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>
          Result:
        </Text>
        <Text style={styles.result}>
          {Dinero({
            amount: Math.round((parseFloat(futureAmount) || 0) * 100)
          }).toFormat('$0,0.00')}
        </Text>
      </View>
    ) : null
  };

  return (
    <FlatList
      style={styles.container}
      data={Object.values(fields)}
      renderItem={renderField}
    />
  );
};

export default React.memo(CompoundInterest);
