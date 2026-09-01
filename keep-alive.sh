#!/bin/bash
# Persistent Next.js launcher for the reverse-proxy setup.
# Kills any stale process holding port 3021, then loops the node process
# with a short backoff so a crash-restart cycle logs but never spins.

cd /home/ttci9pewg642/saggi-law-firm
set -a; source .env; set +a
export PORT=3021
NODE=/opt/alt/alt-nodejs24/root/usr/bin/node
LOG=/home/ttci9pewg642/logs/next-app.log

# Kill any stale passenger-app child still holding the port. Safe to
# run — grep -v self so we do not kill this parent bash.
for pid in $(pgrep -f "passenger-app.js" | grep -v $$); do
  kill -9 "$pid" 2>/dev/null
done
sleep 1

while true; do
  echo "[$(date)] Starting app..." >> "$LOG"
  $NODE /home/ttci9pewg642/saggi-law-firm/passenger-app.js >> "$LOG" 2>&1
  echo "[$(date)] App exited (code $?), restarting in 3s..." >> "$LOG"
  sleep 3
done
