.PHONY: all
all: build

.PHONY: build
build:
	cd wasm && $(MAKE) build
	cd web && npm run build

.PHONY: lint
lint:
	cd wasm && $(MAKE) lint
	cd web && npm run lint

.PHONY: test
test:
	cd wasm && $(MAKE) test
	cd web && npm run test
