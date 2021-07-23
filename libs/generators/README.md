# @ez-tool/nx-generators

The Nx quickstart generators

### Prettier

### Vscode settings

### Recommended extensions

### Prettier, Prettier Quick

### Husky, lint-staged

- yarn add -D husky@7.0.1 pretty-quick@3.1.1 lint-staged@11.1.0
- yarn husky install
- husky add .husky/pre-commit "yarn lint-staged --allow-empty"
- update package.json

```
"lint-staged": {
  "*": [
    "pretty-quick --staged",
    "git add -f"
  ]
}
```

### Eslint - sort and remove unused imports

- yarn add -D eslint-plugin-import@2.23.4 eslint-plugin-simple-import-sort@7.0.0 eslint-plugin-unused-imports@1.1.2
- update .eslintrc

```
"plugins": ["@nrwl/nx", "import", "simple-import-sort", "unused-imports"],
"overrides": [
  // Sort and remove unused imports
  "simple-import-sort/imports": "error",
  "simple-import-sort/exports": "error",
  "import/first": "error",
  "import/newline-after-import": "error",
  "import/no-duplicates": "error",
  "unused-imports/no-unused-imports": "error"
]
```

- update .husky > pre-commit

```
yarn nx affected:lint --fix
```

- update nx.json

```
"affected": {
  "defaultBase": "origin/master"
},
```
