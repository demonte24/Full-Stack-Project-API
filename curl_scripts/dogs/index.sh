#!/bin/bash
curl 'http://localhost:4741/dogs' \
--include \
--request GET \
--header "Authorization: Bearer ${TOKEN}" \

echo
