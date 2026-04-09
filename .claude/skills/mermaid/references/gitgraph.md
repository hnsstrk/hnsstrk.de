# GitGraph

## Syntax
```
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
```

## Commands
| Command | Description |
|---------|-------------|
| `commit` | Add commit to current branch |
| `branch name` | Create new branch |
| `checkout name` | Switch to branch |
| `merge name` | Merge branch into current |
| `cherry-pick id:"abc"` | Cherry-pick a commit |

## Commit Options
```
commit id: "abc123"
commit msg: "feat: add feature"
commit tag: "v1.0"
commit type: HIGHLIGHT
commit id: "abc" msg: "fix" tag: "v1.1" type: REVERSE
```

### Commit Types
- `NORMAL` (default)
- `HIGHLIGHT` — emphasized
- `REVERSE` — inverse colors

## Branch Ordering
```
%%{init: { 'gitGraph': {'mainBranchOrder': 2}} }%%
gitGraph
    commit
    branch feature order: 1
    branch develop order: 3
```
Lower order = rendered higher/earlier.

## Cherry-Pick
```
cherry-pick id: "commitId"
cherry-pick id: "commitId" parent: "parentId"  %% for merge commits
cherry-pick id: "commitId" tag: "v2.0"
```

## Configuration
```yaml
config:
  gitGraph:
    showBranches: true
    showCommitLabel: true
    mainBranchName: main
    mainBranchOrder: 0
    rotateCommitLabel: true
    parallelCommits: false  %% v10.8.0+
```

## Theme Variables
`git0`–`git7`: branch colors, `commitLabelColor`, `commitLabelBackground`, `commitLabelFontSize`, `tagLabelColor`, `tagLabelBackground`, `tagLabelBorder`, `tagLabelFontSize`

## Orientation
```
gitGraph TB:   %% Top to Bottom (vertical)
gitGraph LR:   %% Left to Right (default, horizontal)
```
