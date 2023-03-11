BINARY=hcl-initializer

default: build

build-ui:
	npm install --prefix ui
	npm run build --prefix ui

run-web:
	python3 main.py