# @ez-tool/nx-generators

The Nx quickstart generators

### github1s

### Prettier

### Vscode settings

### Recommended extensions

### Prettier, Prettier Quick

### Husky, lint-staged

- yarn add -D husky@7.0.1 pretty-quick@3.1.1 lint-staged@11.1.0
- yarn husky install
- husky add .husky/pre-commit "yarn lint-staged --allow-empty"
- update package.json

```json
{
  "scripts": { "postinstall": "husky install" },
  "lint-staged": {
    "*": ["pretty-quick --staged", "git add -f"]
  }
}
```

### commitizen, conventional changelog

- yarn add -D commitizen@4.2.4 cz-customizable@6.3.0
- add cz-config.js
- add package.json config
- git-commit-lint.js
- add docs
- husky add .husky/prepare-commit-msg "node ./scripts/git-commit-lint.js"
- add PR workflow

```yml
- name: Validate pull request title
  run: node ./scripts/git-commit-lint.js "${{ github.event.pull_request.title }}"
```

- update package.json

````json
```json
{
  "scripts": { "commit": "git-cz" },
}
````

### Eslint - sort and remove unused imports

- yarn add -D eslint-plugin-import@2.23.4 eslint-plugin-simple-import-sort@7.0.0 eslint-plugin-unused-imports@1.1.2
- update .eslintrc

```json
{
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
}
```

- update .husky > pre-commit

```
yarn nx affected:lint --fix
```

- update nx.json

```json
"affected": {
  "defaultBase": "origin/master"
},
```

### Github workflows

- build

```yml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: Build & Affected Release

on:
  push:
    branches:
      - master
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
    steps:
      - name: Checkout GIT
        uses: actions/checkout@v2
        with:
          fetch-depth: 2

      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            ${{ steps.yarn-cache-dir-path.outputs.dir }}
            **\node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install yarn dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn install

      - name: Lint affected projects
        run: yarn nx affected --target=lint --base=HEAD~1 --head=HEAD

      - name: Build affected projects
        run: yarn nx affected --target=build --base=HEAD~1 --head=HEAD

      - name: Test affected projects
        run: yarn nx affected --target=test --base=HEAD~1 --head=HEAD

      - name: Release effected projects
        if: github.ref == 'refs/heads/master'
        run: echo "yarn nx affected --target=release --base=HEAD~1 --head=HEAD"
```

- pr

```yml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.

name: PR or Branch Validation

on:
  push:
    - pull_request
    branches:
      - *
      - !master
      - !main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout GIT
        uses: actions/checkout@v2
        with:
          fetch-depth: 500

      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            ${{ steps.yarn-cache-dir-path.outputs.dir }}
            **\node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install yarn dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn install

      - name: Lint affected projects
        run: yarn nx affected --target=lint --base=origin/master --head=HEAD

      - name: Build affected projects
        run: yarn nx affected --target=build --base=origin/master --head=HEAD

      - name: Test affected projects
        run: yarn nx affected --target=test --base=origin/master --head=HEAD

```

### Configure Renovate BOT
