.PHONY: all build dev deploy lint test clean firebase-emulators

all: build

build:
	pnpm -r build

dev:
	pnpm -r dev

deploy:
	pnpm -r deploy

lint:
	pnpm -r lint

test:
	pnpm -r test

clean:
	pnpm -r clean

firebase-emulators:
	firebase emulators:start --import=./firebase-data --export-on-exit
