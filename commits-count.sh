#!/bin/bash
set -eou pipefail

source=$1
target=$2

commitsCount=$(git log --oneline "$source" "^$target" | wc -l)

echo "$commitsCount"