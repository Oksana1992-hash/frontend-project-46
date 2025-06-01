install:
	npm ci

help:
	echo help

publish:
	npm publish --dry-run

lint:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npm test -- --coverage
