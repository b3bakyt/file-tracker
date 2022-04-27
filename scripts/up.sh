#!/usr/bin/env bash

cd ../service && yarn && yarn build && docker-compose up -d