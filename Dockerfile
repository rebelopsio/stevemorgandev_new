FROM ubuntu:20.04

MAINTAINER Stephen Morgan "steve@rebelops.io"

RUN apt-get update -y && \
    apt-get install -y python3-pip python3-dev

COPY ./requirements.txt /stevemorgandev/requirements.txt

WORKDIR /stevemorgandev

RUN pip install -r requirements.txt

COPY . /stevemorgandev

RUN ["chmod", "+x", "./gunicorn.sh"]

ENTRYPOINT ["./gunicorn.sh"]