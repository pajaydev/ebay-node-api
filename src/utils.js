'use strict';
// to make string uppercase.
function upperCase(data) {
    if (!isString(data)) data = data.toString();
    return data.toUpperCase();
};

// Returns if a value is a string
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

module.exports = {
    upperCase
}