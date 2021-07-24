let workspace;

// Get nx workspace json
try {
  workspace = require('./angular.json').projects;
} catch {
  workspace = require('./workspace.json').projects;
}

module.exports = {
  types: [
    { value: 'feat', name: 'feat: A new feature' },
    { value: 'fix', name: 'fix: A bug fix' },
    { value: 'perf', name: 'perf: A code change that improves performance' },
    { value: 'docs', name: 'docs: Documentation only changes' },
    { value: 'test', name: 'test: Adding missing tests or correcting existing tests' },
    { value: 'chore', name: "chore: Other changes that don't modify src or test files" },
    { value: 'ci', name: 'ci: Changes to CI configuration files and scripts' },
    { value: 'revert', name: 'revert: Revert a PR or a commit' }
  ],
  scopes: [
    ...Object.keys(workspace).map(project => ({ name: project, value: project })),
    {
      name: 'testing',
      description: 'anything testing specific (e.g., jest or cypress)'
    },
    {
      name: 'repo',
      description: 'anything related to managing the repo itself'
    },
    { name: 'misc', description: 'misc stuff' },
    { name: 'release', description: 'anything related to release process' }
  ],
  // Ticket options
  allowTicketNumber: true,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // It needs to match the value for field type. Eg.: 'fix'
  // scopeOverrides: {
  //   fix: [
  //     {name: 'merge'},
  //     {name: 'style'},
  //     {name: 'e2eTest'},
  //     {name: 'unitTest'}
  //   ]
  // },

  // Override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE (lowercase) description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['ticketNumber'],
  // limit subject length
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
  subjectLimit: 100
};
