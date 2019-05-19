# Compound Interest Calculator

This package contains a React component representing a compound interest
calculator that can be used to calculate the future value of an investment
based on the principal, interest, annual addition, compounding frequency
and number of years.

## Features

* built with React hooks,
* written in TypeScript,
* uses Material UI.

## Usage

### Install

Run `npm install react-compound-interest` or `yarn install react-compound-interest`.

### Add to your code
Next,

```
import CompoundInterest from 'react-compound-interest';
```

Finally,

```
<CompoundInterest title="Compound Interest Calculator" />
```

### Props

Current version supports following props:

* `title`: text to be displayed in the header,
* `options`: component options, namely
    - `withAnnualAddition`: whether or not you need a field for annual addition (`true` by default).

### UI

Enter your principal, interest, annual addition, compounding frequency and
number of years you expect your investment to grow. The future value will
be calculated and displayed automatically.

## Dependencies

* [TypeScript](https://github.com/microsoft/TypeScript),
* [React.js >= v16.8](https://github.com/facebook/react),
* [Material UI](https://github.com/mui-org/material-ui),
* [Dinero.js](https://github.com/sarahdayan/dinero.js).

## License

[The MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2019 [Ruslan Bredikhin](https://ruslanbredikhin.com/)
