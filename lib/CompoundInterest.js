import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dinero from 'dinero.js';
var defaults = {
    principal: 1000,
    interest: 12,
    annualAddition: 100,
    timesPerYear: 1,
    numberOfYears: 10
};
export var compound = function (_a) {
    var principal = _a.principal, interest = _a.interest, annualAddition = _a.annualAddition, timesPerYear = _a.timesPerYear, numberOfYears = _a.numberOfYears;
    var k = 1 + interest / 100 / timesPerYear;
    return (principal * Math.pow(k, numberOfYears) +
        (annualAddition * (Math.pow(k, numberOfYears + 1) - k)) / (k - 1));
};
var styles = function (theme) {
    return createStyles({
        root: {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: '2em'
        },
        header: {
            textTransform: 'uppercase'
        },
        field: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexBasis: 100
        },
        result: {
            fontSize: '10vw'
        }
    });
};
var CompoundInterest = function (_a) {
    var title = _a.title, classes = _a.classes;
    var useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo;
    var _b = useState(''), principal = _b[0], setPrincipal = _b[1];
    var _c = useState(''), interest = _c[0], setInterest = _c[1];
    var _d = useState(''), annualAddition = _d[0], setAnnualAddition = _d[1];
    var _e = useState(''), timesPerYear = _e[0], setTimesPerYear = _e[1];
    var _f = useState(''), numberOfYears = _f[0], setNumberOfYears = _f[1];
    var _g = useState(''), futureAmount = _g[0], setFutureAmount = _g[1];
    var futureMemo = useMemo(function () {
        return compound({
            principal: parseFloat(principal),
            interest: parseFloat(interest),
            annualAddition: parseFloat(annualAddition),
            timesPerYear: parseInt(timesPerYear),
            numberOfYears: parseInt(numberOfYears)
        }).toString() || '';
    }, [principal, interest, annualAddition, timesPerYear, numberOfYears]);
    useEffect(function () {
        setFutureAmount(futureMemo);
    }, [futureMemo]);
    return (React.createElement(Grid, { container: true, direction: "column", className: classes.root },
        React.createElement(Grid, { item: true, className: classes.field }, title && (React.createElement("header", null,
            React.createElement(Typography, { variant: "subtitle1", className: classes.header }, title)))),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Principal", id: "principal", InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "$")
                }, value: principal, onChange: function (e) { return setPrincipal(e.currentTarget.value); } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Interest", id: "interest", className: classes.field, InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "%")
                }, value: interest, onChange: function (e) { return setInterest(e.currentTarget.value); } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Annual addition", id: "annual-addition", className: classes.field, InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "$")
                }, value: annualAddition, onChange: function (e) { return setAnnualAddition(e.currentTarget.value); } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Times  per year", id: "times-per-year", className: classes.field, value: timesPerYear, onChange: function (e) { return setTimesPerYear(e.currentTarget.value); } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Number of years", id: "number-of-years", className: classes.field, value: numberOfYears, onChange: function (e) { return setNumberOfYears(e.currentTarget.value); } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(Typography, { variant: "h1", className: classes.result }, Dinero({
                amount: Math.round((parseFloat(futureAmount) || 0) * 100)
            }).toFormat('$0,0.00')))));
};
export default withStyles(styles)(React.memo(CompoundInterest));
//# sourceMappingURL=CompoundInterest.js.map