#!/bin/bash
curl 'http://localhost:4741/dogs' \
--include \
--request POST \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "breed": {
    "name": "'"${NAME}"'",
    "breed": "'"${BREED}"'"
  }
}'
echo
