.PHONY: all
all: build

.PHONY: build
build:
	cd wasm && $(MAKE) build
	cd web && npm run build

.PHONY: build-prod
build-prod:
	cd wasm && $(MAKE) build-prod
	cd web && npm run build:prod

.PHONY: lint
lint:
	cd wasm && $(MAKE) lint
	cd web && npm run lint

.PHONY: test
test:
	cd wasm && $(MAKE) test
	cd web && npm run test
