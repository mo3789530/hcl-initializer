BINARY=hcl-initializer

default: build

build-ui:
	npm install --prefix ui
	npm run build --prefix ui

build-json2hcl:
	go build -buildmode=c-shared -o main.so main.go

run-web:
	python3 main.py