/*jslint indent:4 */
/*global module, process */
(function () {
    'use strict';
    module.exports = {
        hash: {},
        data: {
            root: {
                cwd: process.cwd(),
                partials: {
                    src: './tests/',
                    ext: '.hbs',
                },
                delimiter: {
                    ldim: '{{',
                    rdim: '}}'
                }
            }
        },
        name: 'helper_name',
        fn: function () {
            return true;
        },
        inverse: function () {
            return false;
        }
    };
}());
