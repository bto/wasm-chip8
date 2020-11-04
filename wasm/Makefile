.PHONY: all
all: build

.PHONY: build
build:
	wasm-pack build

.PHONY: build-prod
build-prod:
	wasm-pack build --release

.PHONY: lint
lint:
	cargo clippy

.PHONY: test
test:
	cargo test
