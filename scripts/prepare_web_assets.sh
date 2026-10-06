#!/usr/bin/env bash
set -euo pipefail
rm -rf app/src/main/assets
mkdir -p app/src/main/assets
cp -R web/* app/src/main/assets/
