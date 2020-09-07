'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Ensure environment variables are read.
require('./config/env');

const fs = require('fs');
const {prepareProxy, prepareUrls} = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('./config/paths');

const configFactory = require('./config/webpack.config');
const config = configFactory('development')

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const appName = require(paths.appPackageJson).name;
const useTypeScript = fs.existsSync(paths.appTsConfig);
const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
const urls = prepareUrls(
  protocol,
  HOST,
  PORT,
  paths.publicUrlOrPath.slice(0, -1)
);

const proxySetting = require(paths.appPackageJson).proxy;
const proxyConfig = prepareProxy(
  proxySetting,
  paths.appPublic,
  paths.publicUrlOrPath
);

const createDevServerConfig = require('./config/webpackDevServer.config');
config['devServer'] = createDevServerConfig(
  proxyConfig,
  urls.lanUrlForConfig,
  PORT,
);

module.exports = config
