.PHONY: run

run: mock-server dev-server

dev-server:
	@API_URL=http://localhost:3000 ./node_modules/.bin/webpack-dev-server \
		--content-base . --inline --hot --history-api-fallback

mock-server:
	@node ./fake_backend/index.js &
