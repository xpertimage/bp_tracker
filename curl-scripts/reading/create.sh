#!/bin/bash

API="http://localhost:4741"
URL_PATH="/readings"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "reading": {
      "systolic": "'"${S}"'",
      "diastolic": "'"${D}"'",
      "pulse": "'"${P}"'"
    }
  }'

echo
