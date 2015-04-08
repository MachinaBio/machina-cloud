# machina-cloud

To get started:

1. Install [Docker](http://docker.io)
2. `./start.sh`

That's all, folks.  ;-)

To stop it once it's running: `sudo docker stop machina-cloud`

Any changes to the Dockerfile necessitate creating a new image, in which case you should run `build.sh` and supply an argument for what tag the new image should have.  You'll then need to push the changes to the Docker repo.  For example:

```
./build.sh "foo"
sudo docker push machinabio/machina-cloud
```
