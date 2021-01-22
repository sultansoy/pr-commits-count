#!/bin/bash
set -eou pipefail

source=$1
target=$2

sourcePath=$(git branch -r | grep "$source" | xargs)
targetPath=$(git branch -r | grep "$target" | xargs)

commitsCount=$(git log --oneline "$sourcePath" \^"$targetPath" | wc -l)

echo "$commitsCount"
