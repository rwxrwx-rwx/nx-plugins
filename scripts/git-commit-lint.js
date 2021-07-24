#!/usr/bin/env node
// @ts-check
const { types, scopes } = require('../.cz-config.js');

console.log('🐟🐟🐟 Validating git commit message 🐟🐟🐟');

const allowedTypes = types.map(type => type.value);
const allowedScopes = scopes.map(scope => scope.name);

const gitMessage = process.argv[2] || require('child_process').execSync('git log -1 --no-merges').toString().trim();
const commitMsgRegex = `(${allowedTypes.join('|')})\\((${allowedScopes.join('|')})\\):\\s(([a-z0-9:\-\s])+)`;
const matchCommit = new RegExp(commitMsgRegex, 'g').test(gitMessage);
const exitCode = +!matchCommit;

if (exitCode === 0) {
  console.log('Commit ACCEPTED 👌');
} else {
  console.log(
    '[Error]: Ho no! 😦 Your commit message: \n' +
      '-------------------------------------------------------------------\n' +
      gitMessage +
      '\n-------------------------------------------------------------------' +
      '\n\n 👉️ Does not follow the commit message convention specified in the docs/GIT.md file.'
  );
  console.log('\ntype(scope): subject \n BLANK LINE \n body');
  console.log('\n');
  console.log(`possible types: ${allowedTypes.join('|')}`);
  console.log(`possible scopes: ${allowedScopes.join('|')} (if unsure use "core")`);
  console.log('\nEXAMPLE: \n' + 'feat(nx): add an option to generate lazy-loadable modules\n');

  process.exit(exitCode);
}
