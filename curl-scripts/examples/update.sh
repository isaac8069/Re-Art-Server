#!/bin/bash

API="http://localhost:8000"
URL_PATH="/examples"

# Check required environment variables
if [[ -z "${TOKEN}" || -z "${ID}" || -z "${TEXT}" ]]; then
  echo "Error: TOKEN, ID, and TEXT must be set as environment variables."
  echo "Usage: TOKEN=<token> ID=<example_id> TEXT=<new_text> ./update-example.sh"
  exit 1
fi

# Send PATCH request to update the example
curl --silent --show-error --fail "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "example": {
      "text": "'"${TEXT}"'"
    }
  }'

echo -e "\nUpdate request for example with ID ${ID} sent."
