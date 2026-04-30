#!/bin/bash

# Set variables
REPO="tonyalaribe/quickstatic"
BINARY_NAME="quickstatic"

# GitHub API URL for the latest release
API_URL="https://api.github.com/repos/$REPO/releases/latest"

# Use curl to fetch the latest release data in JSON format 
# Use grep to find the line containing the tag_name, then cut to extract the value
TAG_NAME=$(curl -s $API_URL | grep '"tag_name":' | sed -E 's/.*"tag_name": "([^"]+)".*/\1/')
TAG_NAME=${TAG_NAME:-"v0.1.16"}

# Construct the asset name based on the provided format
# Assuming the architecture is x86_64-unknown-linux-musl, adjust if necessary
ASSET_NAME="quickstatic_${TAG_NAME}_x86_64-unknown-linux-musl.tar.gz"

# Construct the download URL for the asset
DOWNLOAD_URL="https://github.com/$REPO/releases/download/$TAG_NAME/$ASSET_NAME"

# Download the asset
echo "Downloading $ASSET_NAME FROM $DOWNLOAD_URL ..."
curl -L $DOWNLOAD_URL -o $ASSET_NAME

# Check if the download was successful
if [ -f "$ASSET_NAME" ]; then
    # Extract the downloaded tar.gz file
    echo "Extracting $ASSET_NAME..."
    tar -xvf $ASSET_NAME
    echo "$ASSET_NAME extracted."
else
    echo "Failed to download $ASSET_NAME."
fi


# Make the binary executable
chmod +x $BINARY_NAME

npm i

make css-prod

node scripts/generate-og-images.mjs

# Fetch OpenAPI spec and generate API reference docs
if [ -n "$OPENAPI_SPEC_URL" ]; then
  curl -sf "$OPENAPI_SPEC_URL" -o assets/api/openapi.json || echo "Using cached spec"
fi
node scripts/generate-api-docs.mjs

# Run the binary to generate the static site
./$BINARY_NAME build
