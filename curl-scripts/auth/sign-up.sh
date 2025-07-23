#!/bin/bash

API="http://localhost:8000"
URL_PATH="/sign-up"

# Check required environment variables
if [[ -z "${EMAIL}" || -z "${PASSWORD}" ]]; then
  echo "Error: EMAIL and PASSWORD must be set as environment variables."
  echo "Usage: EMAIL=<email> PASSWORD=<password> ./sign-up.sh"
  exit 1
fi

# Send POST request to create a new user
curl --silent --show-error --fail "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo -e "\nSign-up request sent."
