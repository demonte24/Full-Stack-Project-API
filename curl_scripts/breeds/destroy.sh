curl "http://localhost:4741/breeds/${BREED_ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
