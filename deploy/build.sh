#!/bin/bash
set -euo pipefail

REPO_DIR="/home/hans/Repositories/hnsstrk.de"
DEPLOY_DIR="/var/www/hnsstrk.de"

cd "$REPO_DIR"
git pull --ff-only origin main
git submodule update --init --recursive
hugo --minify --gc --cleanDestinationDir --destination "$DEPLOY_DIR"

# Prüfe ob Build erfolgreich
[ -f "$DEPLOY_DIR/index.html" ] || { echo "Build fehlgeschlagen: index.html fehlt"; exit 1; }
echo "Deploy erfolgreich: $(date)"
