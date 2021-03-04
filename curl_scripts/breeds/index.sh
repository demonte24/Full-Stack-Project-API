#!/bin/bash
curl 'http://localhost:4741/breeds' \
--include \
--request GET \
--header "Authorization: Bearer ${TOKEN}" \

echo
