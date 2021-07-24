// @ts-check

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function syncWorkspacePackageJsonFiles() {
  glob.sync('libs/**/package.json', { ignore: '**/node_modules/**' }).forEach(src => {
    const dest = src.replace('libs/', 'workspaces/');
    try {
      const srcJson = require(path.resolve(src));
      const destJson = require(path.resolve(dest));

      if (srcJson.dependencies) {
        destJson.dependencies = srcJson.dependencies;
      }

      if (srcJson.devDependencies) {
        destJson.devDependencies = srcJson.devDependencies;
      }

      if (srcJson.peerDependencies) {
        destJson.peerDependencies = srcJson.peerDependencies;
      }

      fs.writeFileSync(dest, JSON.stringify(destJson, null, 2));
    } catch {}
  });
}

syncWorkspacePackageJsonFiles();
