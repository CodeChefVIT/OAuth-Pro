#Makefile
SHELL := /bin/bash

build:
	@echo "Building Oauth Binary..."
	go build
	@echo "Build complete"

run:
	@echo "Loading configs..."
	@source config.env
	@echo "Booting server..."
	./oauth-pro
