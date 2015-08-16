/*global module */
/*jslint indent:4 */
(function () {
    'use strict';
    var options = require('./options');
    module.exports = {
        '0': 'toto',
        '1': [1, 2, 3],
        '2': null,
        '3': {
            toto: 'yo'
        },
        '4': options
    };
}());
