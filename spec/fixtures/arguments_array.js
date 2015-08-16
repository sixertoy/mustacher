/*global module */
/*jslint indent:4 */
(function () {
    'use strict';
    var options = require('./options');
    module.exports = ['toto', [1, 2, 3], null, {
            toto: 'yo'
        },
        options];
}());
