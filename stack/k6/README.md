# For API load testing
# This part of the project is not yet complete

### To Install:
- `brew install k6`

### To Run:
- Optionally login in to your site (localhost.helix.ai/account/login) and get the cookies
- Set the CSRF_TOKEN and COOKIE environment variables in your .env
- `sh run.sh`


### Deploy Results:
- `gsutil -m cp -r *.html *.json gs://oa-loadtestresults/` (loaded by `https://localhost.helix.ai:3003/oa/load-tests)
