'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Ensure environment variables are read.
require('./config/env');

const configFactory = require('./config/webpack.config');
module.exports = configFactory('production')
