#!/usr/bin/env node

/**
 * Builds back office client files.
 *
 * It needs to be run from project root directory.
 *
 * Usage:
 *
 * # Build back office client for development
 * $ build
 *
 * # Build back office client for production
 * $ build -p
 */

'use strict';

const {exec} = require('child_process');
const path = require('path');
const util = require('util');

const openVeoApi = require('@openveo/api');

const applicationConf = require('../conf.js');

/**
 * Logs given message to stdout with a prefix.
 *
 * @param {String} message the message to log
 */
function log(message) {
  console.log(`build > ${message}`);
}

/**
 * Parses command line arguments.
 *
 * @return {Object} args The list of parsed arguments
 */
function getArguments() {
  const args = {
    production: false
  };

  for (let i = 2; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case '-p':
        args.production = true;
        break;
      default:
        console.log(`unexpected option ${process.argv[i]}`);
        break;
    }
  }

  return args;
}

/**
 * Compiles and concat JavaScript files.
 *
 * @param {Array} filesPaths The list of files paths to compile and concat
 * @param {String} outputPath The file output path
 * @return {Promise} Promise resolving when JavaScript files have been compiled
 */
async function compileJavaScriptFiles(filesPaths, outputPath) {
  await util.promisify(openVeoApi.fileSystem.mkdir)(path.dirname(outputPath));
  return new Promise((resolve, reject) => {
    const command = `npx uglifyjs -c -m -o ${outputPath} -- ${filesPaths.join(' ')}`;
    log(`${process.cwd()} > ${command}`);
    exec(command, {cwd: process.cwd()}, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

/**
 * Compiles SCSS files.
 *
 * @param {String} scssDirectoryPath The path where to find SCSS files
 * @param {String} outputPath The destination directory path
 * @param {Boolean} [production] true to build for production, false otherwise
 * @return {Promise} Promise resolving when SCSS files have been compiled
 */
async function compileScssFiles(scssDirectoryPath, outputPath, production) {
  return new Promise((resolve, reject) => {
    const command = `compass compile -c ./compass.rb \
--force \
--sass-dir ${scssDirectoryPath} \
--css-dir ${outputPath} \
${production ? '-e production -s compressed --no-sourcemap' : ''}
`;
    log(`${process.cwd()} > ${command}`);
    exec(command, {cwd: process.cwd()}, (error, stdout, stderr) => {
      if (error) return reject(error);
      console.log(stdout);
      return resolve();
    });
  });
}

/**
 * Resolves given files paths with the given prefix.
 *
 * @param {Array} filesPaths The list of files paths to resolve
 * @return {Array} The list of resolved files paths
 */
function resolveFilesPaths(filesPaths, prefix) {
  return filesPaths.map((filePath) => {
    return path.join(prefix, filePath);
  });
}

/**
 * Builds back office client.
 */
async function main() {
  const args = getArguments();
  const rootPath = path.join(__dirname, '../');
  const assetsPath = path.join(rootPath, 'assets');
  const backAssetsPath = path.join(assetsPath, 'be');
  const baseSourcesPath = path.join(rootPath, 'app/client');
  const buildPath = path.join(rootPath, 'build');
  const backSourcesPath = path.join(baseSourcesPath, 'admin');
  const backCssDistPath = path.join(backAssetsPath, 'css');
  const backBuildPath = path.join(buildPath, 'admin');
  const backJsPath = path.join(backSourcesPath, 'js');
  const backScssPath = path.join(backSourcesPath, 'compass/sass');
  const backScssBuildPath = path.join(backBuildPath, 'scss');
  const backCssMainBuildPath = path.join(backScssBuildPath, '<%= plugin %>.css');
  const backCssMainDistPath = path.join(backCssDistPath, '<%= plugin %>.css');

  log(`Copy back office SCSS files to ${backScssBuildPath}`);
  await util.promisify(openVeoApi.fileSystem.copy.bind(openVeoApi.fileSystem))(
    backScssPath,
    backScssBuildPath
  );

  log(`Compile back office client SCSS files into ${backScssBuildPath}`);
  await compileScssFiles(backScssBuildPath, backScssBuildPath, args.production);

  if (!args.production) {
    log(`Copy back office CSS and SCSS files to ${backCssDistPath}`);
    await util.promisify(openVeoApi.fileSystem.copy.bind(openVeoApi.fileSystem))(
      backScssBuildPath,
      backCssDistPath
    );
  } else {
    log(`Copy back office CSS files to ${backCssDistPath}`);
    await util.promisify(openVeoApi.fileSystem.copy.bind(openVeoApi.fileSystem))(
      backCssMainBuildPath,
      backCssMainDistPath
    );

    const backDistPath = path.join(assetsPath, applicationConf.backOffice.scriptFiles.prod[0]);

    log(`Compile back office JavaScript files to ${backDistPath}`);
    await compileJavaScriptFiles(
      resolveFilesPaths(applicationConf.backOffice.scriptFiles.dev, backJsPath),
      backDistPath
    );
  }

}

main();
