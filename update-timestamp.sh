#!/bin/bash

# Get the timestamp of the last commit (Tokyo time zone)
LAST_UPDATE=$(TZ='Asia/Tokyo' git log -1 --format="%cd" --date=format:'%Y/%m/%d-%H:%M')
echo $LAST_UPDATE | sed -e "s|/|-|g"

# Replace placeholders in HTML files
sed -i'.bak' "s/__LAST_UPDATE_TIME__/$LAST_UPDATE/g" src/empressscup_2024.html