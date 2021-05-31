#!/bin/bash

HOST=10.6.0.99
CONTEXT=/api
if [ ! -z $1 ]; then
  HOST=$1
  unset CONTEXT
fi

ARR_SIZE=$(jq '. | length' orders.json)
for i in $(seq 0 `expr $ARR_SIZE - 1`); do
  jq --argjson i $i '.[$i]' orders.json | curl -X POST -H 'Content-type: application/json' -d @- http://$HOST$CONTEXT/v1/orders;
done;
