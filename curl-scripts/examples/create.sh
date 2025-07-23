#!/bin/bash

API="http://localhost:8000"
URL_PATH="/examples"

# Check required environment variables
if [[ -z "${TOKEN}" || -z "${TITLE}" || -z "${TEXT}" ]]; then
  echo "Error: TOKEN, TITLE, and TEXT must be set as environment variables."
  echo "Usage: TOKEN=<token> TITLE=<title> TEXT=<text> ./create-example.sh"
  exit 1
fi

# Send POST request to create an example
curl --silent --show-error --fail "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "example": {
      "title": "'"${TITLE}"'",
      "text": "'"${TEXT}"'"
    }
  }'

echo -e "\nExample creation request sent."
