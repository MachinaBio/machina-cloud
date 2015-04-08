#!/bin/sh

# This script builds a docker image based on the current docker file.
# It accepts an argument to determine the tag.

if [ $# -eq 0 ]; then
  echo "No tag supplied.  Need to supply a tag for this image."
else
  sudo docker build -t machinabio/machina-cloud:$1 .
fi
