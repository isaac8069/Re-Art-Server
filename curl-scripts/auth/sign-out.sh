#!/bin/bash

API="http://localhost:8000"
URL_PATH="/sign-out"

# Check required environment variables
if [[ -z "${TOKEN}" ]]; then
  echo "Error: TOKEN must be set as an environment variable."
  echo "Usage: TOKEN=<your_token> ./sign-out.sh"
  exit 1
fi

# Send DELETE request to sign out
curl --silent --show-error --fail "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo -e "\nSign-out request sent."
