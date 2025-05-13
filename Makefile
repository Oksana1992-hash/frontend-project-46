install:
	npm ci

gendiff:
	node bin/gendiff.js -h

help:
	echo help

publish:
	npm publish --dry-run

lint:
	npx eslint .
