#!/bin/bash

API="http://localhost:8000"
URL_PATH="/examples"

# Check required environment variables
if [[ -z "${TOKEN}" || -z "${ID}" ]]; then
  echo "Error: TOKEN and ID must be set as environment variables."
  echo "Usage: TOKEN=<token> ID=<example_id> ./get-example.sh"
  exit 1
fi

# Send GET request to retrieve example by ID
curl --silent --show-error --fail "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo -e "\nRequest to get example with ID ${ID} sent."
