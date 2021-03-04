#!/bin/bash
curl 'http://localhost:4741/breeds' \
--include \
--request POST \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "breed": {
    "name": "'"${NAME}"'",
    "country": "'"${COUNTRY}"'"
  }
}'
echo
