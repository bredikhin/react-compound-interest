var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dinero from 'dinero.js';
import { css } from '@emotion/core';
export var compound = function (_a) {
    var principal = _a.principal, interest = _a.interest, annualAddition = _a.annualAddition, timesPerYear = _a.timesPerYear, numberOfYears = _a.numberOfYears;
    var k = 1 + interest / 100 / timesPerYear;
    var l = numberOfYears * timesPerYear;
    return (principal * Math.pow(k, l) +
        (((annualAddition * (Math.pow(k, l) - 1)) / (k - 1)) * k) / timesPerYear);
};
var Header = function (_a) {
    var children = _a.children;
    return (React.createElement("header", null,
        React.createElement(Typography, { variant: "subtitle1", css: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        text-transform: 'uppercase';\n      "], ["\n        text-transform: 'uppercase';\n      "]))) }, children)));
};
var Field = function (_a) {
    var children = _a.children;
    return (React.createElement(Grid, { item: true, css: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      flex: 1;\n      display: 'flex';\n      flex-direction: 'column';\n      justifycontent: 'center';\n    "], ["\n      flex: 1;\n      display: 'flex';\n      flex-direction: 'column';\n      justifycontent: 'center';\n    "]))) }, children));
};
var CompoundInterest = function (_a) {
    var title = _a.title, _b = _a.options, options = _b === void 0 ? {
        withAnnualAddition: true
    } : _b, width = _a.width, height = _a.height;
    var withAnnualAddition = options.withAnnualAddition;
    var useState = React.useState, useEffect = React.useEffect, useMemo = React.useMemo;
    var _c = useState(''), principal = _c[0], setPrincipal = _c[1];
    var _d = useState(''), interest = _d[0], setInterest = _d[1];
    var _e = withAnnualAddition
        ? useState('')
        : ['0', function () { return null; }], annualAddition = _e[0], setAnnualAddition = _e[1];
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
    return (React.createElement(Grid, { container: true, direction: "column", css: css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        min-height: '100%';\n        display: 'flex';\n        flex-direction: 'column';\n        padding: '2em';\n        &&& {\n          ", "\n          ", "\n        }\n      "], ["\n        min-height: '100%';\n        display: 'flex';\n        flex-direction: 'column';\n        padding: '2em';\n        &&& {\n          ", "\n          ", "\n        }\n      "])), width, height) },
        title && (React.createElement(Field, null,
            React.createElement(Header, null, title))),
        React.createElement(Field, null,
            React.createElement(TextField, { label: "Principal", id: "principal", InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "$")
                }, value: principal, onChange: function (e) { return setPrincipal(e.currentTarget.value); } })),
        React.createElement(Field, null,
            React.createElement(TextField, { label: "Interest", id: "interest", InputProps: {
                    startAdornment: React.createElement(InputAdornment, { position: "start" }, "%")
                }, value: interest, onChange: function (e) { return setInterest(e.currentTarget.value); } })),
        withAnnualAddition && (React.createElement(Field, null,
            React.createElement(TextField, { label: "Annual addition", id: "annual-addition", InputProps: {
                    startAdornment: (React.createElement(InputAdornment, { position: "start" }, "$"))
                }, value: annualAddition, onChange: function (e) {
                    return setAnnualAddition(e.currentTarget.value);
                } }))),
        React.createElement(Field, null,
            React.createElement(TextField, { label: "Times per year", id: "times-per-year", value: timesPerYear, onChange: function (e) {
                    return setTimesPerYear(e.currentTarget.value);
                } })),
        React.createElement(Field, null,
            React.createElement(TextField, { label: "Number of years", id: "number-of-years", value: numberOfYears, onChange: function (e) {
                    return setNumberOfYears(e.currentTarget.value);
                } })),
        React.createElement(Field, null,
            React.createElement(Typography, { variant: "h1", css: css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n            font-size: '10vw';\n          "], ["\n            font-size: '10vw';\n          "]))) }, Dinero({
                amount: Math.round((parseFloat(futureAmount) || 0) * 100)
            }).toFormat('$0,0.00')))));
};
export default React.memo(CompoundInterest);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=CompoundInterest.js.map