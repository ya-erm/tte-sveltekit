rm -rf ./src/lib/api/generated

npx @openapitools/openapi-generator-cli generate \
  -i ./src/lib/api/openapi.yml \
  -o ./src/lib/api/generated \
  -c ./src/lib/api/generator-config.json \
  -g typescript-axios
