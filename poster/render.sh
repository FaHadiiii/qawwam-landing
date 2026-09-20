#!/bin/bash
# Render the poster HTML files to PNGs using headless Chrome.
# Usage: ./render.sh [feature|account|play|screens|tablet|all]
set -e

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"

render() {
  local name="$1" w="$2" h="$3"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --virtual-time-budget=5000 --window-size="$w,$h" \
    --screenshot="$DIR/$name.png" "file://$DIR/$name.html" >/dev/null 2>&1
  cp "$DIR/$name.png" "$DIR/../public/$name.png"
  echo "rendered $name.png (${w}x${h}) and copied to public/"
}

# Store screenshots: 9:16, kept out of public/ as they are not site assets.
SCREENS="01-prayer-times 02-analytics 03-quran 04-qiblat"

render_screens() {
  for name in $SCREENS; do
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
      --virtual-time-budget=5000 --window-size=1080,1920 \
      --screenshot="$DIR/screens/$name.png" "file://$DIR/screens/$name.html" >/dev/null 2>&1
    echo "rendered screens/$name.png (1080x1920)"
  done
}

# Tablet screenshots: one 1920x1080 source per screen, rendered twice.
#   7-inch  -> 1920x1080  (scale 1)
#   10-inch -> 2560x1440  (scale 1.333, same layout at higher resolution)
render_tablet() {
  mkdir -p "$DIR/screens-tablet/7-inch" "$DIR/screens-tablet/10-inch"
  for name in $SCREENS; do
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
      --virtual-time-budget=5000 --window-size=1920,1080 \
      --screenshot="$DIR/screens-tablet/7-inch/$name.png" "file://$DIR/screens-tablet/$name.html" >/dev/null 2>&1
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1.3333333 \
      --virtual-time-budget=5000 --window-size=1920,1080 \
      --screenshot="$DIR/screens-tablet/10-inch/$name.png" "file://$DIR/screens-tablet/$name.html" >/dev/null 2>&1
    echo "rendered screens-tablet/$name.png (7-inch 1920x1080, 10-inch 2560x1440)"
  done
}

case "${1:-all}" in
  feature) render feature 1200 630 ;;
  account) render account-feature 1200 630 ;;
  play) render play-feature 1024 500 ;;
  screens) render_screens ;;
  tablet) render_tablet ;;
  all) render feature 1200 630; render account-feature 1200 630; render play-feature 1024 500; render_screens; render_tablet ;;
  *) echo "usage: $0 [feature|account|play|screens|tablet|all]"; exit 1 ;;
esac
