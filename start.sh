#!/bin/sh

cwd=`pwd`;

sudo docker run -d -p 80:3000 --name machina-cloud -v $cwd:/machina-cloud machinabio/machina-cloud:init
