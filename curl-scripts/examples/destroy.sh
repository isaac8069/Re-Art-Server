#!/bin/bash

API="http://localhost:8000"
URL_PATH="/examples"

# Check required environment variables
if [[ -z "${TOKEN}" || -z "${ID}" ]]; then
  echo "Error: TOKEN and ID must be set as environment variables."
  echo "Usage: TOKEN=<token> ID=<example_id> ./delete-example.sh"
  exit 1
fi

# Send DELETE request
curl --silent --show-error --fail "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo -e "\nExample with ID ${ID} delete request sent."
