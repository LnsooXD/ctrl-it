TESTS = test/index.test.js
REPORTER = tap
TIMEOUT = 1000
MOCHA_OPTS =

install:
	@npm install

test: install
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--harmony \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		-r mocha-plugin-co \
		$(MOCHA_OPTS) \
		$(TESTS)
.PHONY: test