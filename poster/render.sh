#!/bin/bash
# Render the poster HTML files to 1024x500 PNGs using headless Chrome.
# Usage: ./render.sh [feature|account|all]
set -e

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"

render() {
  local name="$1"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=5000 --window-size=1200,630 \
    --screenshot="$DIR/$name.png" "file://$DIR/$name.html" >/dev/null 2>&1
  cp "$DIR/$name.png" "$DIR/../public/$name.png"
  echo "rendered $name.png and copied to public/"
}

case "${1:-all}" in
  feature) render feature ;;
  account) render account-feature ;;
  all) render feature; render account-feature ;;
  *) echo "usage: $0 [feature|account|all]"; exit 1 ;;
esac
