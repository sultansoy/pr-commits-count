# PR Commits Count javascript action

Action to checks the count of commits in pull request.

## Inputs

### `source-branch`

Source branch name (default {{github.head_ref}})

### `target-branch`

Target branch name (default {{github.base_ref}})

### `except-branches`

Excepted source branches (possible to pass multiple branches separated by ;)

### `commits-count`

Possible count of commits (default 1)


## Example usage

**In the checkout task fetch-depth should be set to 0**

uses: actions/checkout@v2\
with:\
&nbsp;&nbsp;fetch-depth: 0


uses: sultansoy/pr-commits-count@v1.0\
with:\
&nbsp;&nbsp;source-branch: ${{ github.head_ref }}\
&nbsp;&nbsp;target-branch: ${{ github.base_ref }}\
&nbsp;&nbsp;commits-count: 1\
&nbsp;&nbsp;except-branches: 'dev;test'

Same without except-branches:

uses: sultansoy/pr-commits-count@v1.0\
if: ${{ github.head_ref != 'dev' && github.head_ref != 'test' }}
with:\
&nbsp;&nbsp;source-branch: ${{ github.head_ref }}\
&nbsp;&nbsp;target-branch: ${{ github.base_ref }}\
&nbsp;&nbsp;commits-count: 1\
&nbsp;&nbsp;except-branches: 'dev'
