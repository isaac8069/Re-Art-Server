#!/bin/bash

# Base API URL
API="http://localhost:8000"
URL_PATH="/change-password"

# Check for required environment variables
if [[ -z "${TOKEN}" || -z "${OLDPW}" || -z "${NEWPW}" ]]; then
  echo "Error: TOKEN, OLDPW, and NEWPW must be set as environment variables."
  echo "Usage: TOKEN=<token> OLDPW=<old_password> NEWPW=<new_password> ./change-password.sh"
  exit 1
fi

# Send PATCH request to change password
curl --silent --show-error --fail "${API}${URL_PATH}/" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo -e "\nPassword change request sent."
