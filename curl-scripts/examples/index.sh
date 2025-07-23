#!/bin/bash

API="http://localhost:8000"
URL_PATH="/examples"

# Check if TOKEN is set
if [[ -z "${TOKEN}" ]]; then
  echo "Error: TOKEN must be set as an environment variable."
  echo "Usage: TOKEN=<token> ./get-examples.sh"
  exit 1
fi

# Send GET request to retrieve examples
curl --silent --show-error --fail "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo -e "\nRequest to get all examples sent."
