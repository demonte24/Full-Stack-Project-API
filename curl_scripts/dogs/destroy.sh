curl "http://localhost:4741/dogs/${DOG_ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
