BIN = ./node_modules/.bin
SRC = $(wildcard src/* src/*/*)
TEST = $(wildcard test/* test/*/*)

build: index.js

index.js: src/index.js $(SRC)
	$(BIN)/rollup $< -c > $@

test.js: test/index.js $(TEST)
	$(BIN)/rollup $< -c > $@

test: test.js index.js
	$(BIN)/browserify $< -r templejs-runtime:templejs --debug | $(BIN)/tape-run

clean:
	rm -rf index.js test.js

.PHONY: build clean test
