## declare PHONY
.PHONY: build test all

all:
	make typecheck &&\
		make format &&\
		make lint-src &&\
		make test &&\
		make build-prod

NODE_BIN=node_modules/.bin/

## install dev server
install-server:
	cd server && yarn

## type check
tsc=$(NODE_BIN)tsc
typecheck:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## serve
serve:
	node server

## start
start:
	(trap 'kill 0' INT; make serve & make build & make typecheck-watch)

## transpile
transpile:
	node script/esbuild.js\
		&& cd build/ && cp index.html 200.html && cd ../\
		&& node script/terser.js

## build
remove-build:
	rm -rf build
pre-build: remove-build
	cp -R public build

build: pre-build
	make transpile

build-prod: remove-build
	$(tsc) -p tsconfig.prod.json

## publish
publish-semantic-version:
	npm version $(type) && make build-prod && npm publish

publish-minor:
	make publish-semantic-version type=minor

publish-patch:
	make publish-semantic-version type=patch

publish-major:
	make publish-semantic-version type=major

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__tests__/index.test.js &&\
		$(NODE_BIN)jest __tests__

## format
prettier=$(NODE_BIN)prettier
format:
	$(prettier) --write src/ && $(prettier) --write test/

format-check:
	$(prettier) --check src/ && $(prettier) --check test/

## lint
lint-src:
	$(NODE_BIN)eslint src/** -f='stylish' --color
