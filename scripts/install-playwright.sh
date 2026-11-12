#!/usr/bin/env bash
# Install Playwright's Chromium and its system packages for one workspace package, retrying:
# `--with-deps` runs apt-get, and the runners' Ubuntu mirror sometimes doesn't resolve for a few
# minutes ("Temporary failure resolving 'azure.archive.ubuntu.com'"), which failed whole CI runs.
#
#   scripts/install-playwright.sh <pnpm filter>
set -uo pipefail

filter="${1:?usage: install-playwright.sh <pnpm filter>}"
attempts=4

for attempt in $(seq 1 "$attempts"); do
  if pnpm --filter "$filter" exec playwright install --with-deps chromium; then
    exit 0
  fi
  if [ "$attempt" -lt "$attempts" ]; then
    wait=$((attempt * 30))
    echo "::warning::Installing Chromium for $filter failed (attempt $attempt of $attempts); retrying in ${wait}s."
    sleep "$wait"
  fi
done

echo "::error::Installing Chromium for $filter failed $attempts times."
exit 1
