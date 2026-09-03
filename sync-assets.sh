#!/bin/bash
# Copy the web app into the Android assets folder so the APK ships the current build.
set -e
A=android/app/src/main/assets
rm -rf "$A"
mkdir -p "$A"
cp index.html manifest.webmanifest icon.svg "$A"/
cp -r css js data "$A"/
echo "synced -> $A"
du -sh "$A"
