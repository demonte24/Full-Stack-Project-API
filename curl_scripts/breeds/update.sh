#!/bin/bash
curl "http://localhost:4741/breeds/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "breed": {
      "name": "'"${NAME}"'",
      "country": "'"${COUNTRY}"'"
    }
  }'

echo
