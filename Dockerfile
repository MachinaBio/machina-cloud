FROM debian:7.8
MAINTAINER skyler@machina.bio
RUN apt-get update && \
  apt-get install \
  curl \
  git \
  procps \
  -y
RUN curl https://install.meteor.com/ | sh
WORKDIR /machina-cloud
EXPOSE 3000
CMD ["meteor"]
