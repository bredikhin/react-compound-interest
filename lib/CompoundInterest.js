import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dinero from 'dinero.js';
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
    var title = _a.title, _b = _a.options, options = _b === void 0 ? {
        withAnnualAddition: true
    } : _b, classes = _a.classes;
    var withAnnualAddition = options.withAnnualAddition;
    var useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo;
    var _c = useState(''), principal = _c[0], setPrincipal = _c[1];
    var _d = useState(''), interest = _d[0], setInterest = _d[1];
    var _e = withAnnualAddition ? useState('') : ['0', function () { return null; }], annualAddition = _e[0], setAnnualAddition = _e[1];
    var _f = useState(''), timesPerYear = _f[0], setTimesPerYear = _f[1];
    var _g = useState(''), numberOfYears = _g[0], setNumberOfYears = _g[1];
    var _h = useState(''), futureAmount = _h[0], setFutureAmount = _h[1];
    var futureMemo = useMemo(function () {
        return compound({
            principal: parseFloat(principal),
            interest: parseFloat(interest),
            annualAddition: parseFloat(annualAddition) || 0,
            timesPerYear: parseInt(timesPerYear),
            numberOfYears: parseInt(numberOfYears)
        }).toString() || '';
    }, [principal, interest, annualAddition, timesPerYear, numberOfYears]);
    useEffect(function () {
        setFutureAmount(futureMemo);
    }, [futureMemo]);
    return (React.createElement(Grid, { container: true, direction: "column", className: classes.root },
        title && (React.createElement(Grid, { item: true, className: classes.field },
            React.createElement("header", null,
                React.createElement(Typography, { variant: "subtitle1", className: classes.header }, title)))),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Principal", id: "principal", InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "$")
                }, value: principal, onChange: function (e) { return setPrincipal(e.currentTarget.value); } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Interest", id: "interest", className: classes.field, InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "%")
                }, value: interest, onChange: function (e) { return setInterest(e.currentTarget.value); } })),
        withAnnualAddition && (React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Annual addition", id: "annual-addition", className: classes.field, InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "$")
                }, value: annualAddition, onChange: function (e) {
                    return setAnnualAddition(e.currentTarget.value);
                } }))),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Times  per year", id: "times-per-year", className: classes.field, value: timesPerYear, onChange: function (e) {
                    return setTimesPerYear(e.currentTarget.value);
                } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(TextField, { label: "Number of years", id: "number-of-years", className: classes.field, value: numberOfYears, onChange: function (e) {
                    return setNumberOfYears(e.currentTarget.value);
                } })),
        React.createElement(Grid, { item: true, className: classes.field },
            React.createElement(Typography, { variant: "h1", className: classes.result }, Dinero({
                amount: Math.round((parseFloat(futureAmount) || 0) * 100)
            }).toFormat('$0,0.00')))));
};
export default withStyles(styles)(React.memo(CompoundInterest));
//# sourceMappingURL=CompoundInterest.js.map