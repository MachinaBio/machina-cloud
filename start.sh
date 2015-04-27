#!/bin/sh

sudo docker run -d -p 80:3000 --name machina-cloud -v `pwd`:/machina-cloud machinabio/machina-cloud:init-1.1.1
