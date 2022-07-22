"use strict";
exports.__esModule = true;
var toolkit_1 = require("@reduxjs/toolkit");
var increment = (0, toolkit_1.createAction)('counter/increment');
var decrement = (0, toolkit_1.createAction)('counter/decrement');
var counterReducer = (0, toolkit_1.createReducer)(0, function (builder) {
    builder.addCase(increment, function (state, action) { return state + action.payload; });
    builder.addCase(decrement, function (state, action) { return state - action.payload; });
});
