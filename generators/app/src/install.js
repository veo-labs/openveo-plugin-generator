'use strict';

const fs = require('fs/promises');
const path = require('path');

const config = require('../config/files');

module.exports = async function() {
  const renamePromises = [];

  config.folders.forEach((folder) => {
    const basename = path.basename(folder);
    const renamed = folder.replace(basename, basename + this.properties.templated.Plugin);
    renamePromises.push(fs.rename(`${this.destinationPath(folder)}`, `${this.destinationPath(renamed)}`));
  });

  await Promise.all(renamePromises);
  await this.spawnCommand('npm', ['install']);
  await this.spawnCommand('npm', ['link', '@openveo/api', '@openveo/test']);

  return Promise.resolve();
};
