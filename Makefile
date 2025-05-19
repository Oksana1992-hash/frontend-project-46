install:
	npm ci

gendiff:
	bin/gendiff.js -h

start:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

help:
	echo help

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
