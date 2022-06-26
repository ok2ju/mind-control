SHELL = /bin/bash
WORKDIR := $(PWD)

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

default: run-service
.PHONY: default

run-service:
	@ echo "---> Running service ..."
	@ flask run
.PHONY: run-service

run-db:
	@ echo "---> Running PostgreSQL container ..."
	@ docker run --rm --name mtpostgres -e POSTGRES_USER=$(POSTGRES_USER) -e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) -p 5432:5432 -d postgres
.PHONY: run-db

stop-db:
	@ echo "---> Stopping PostgreSQL container ..."
	@ docker stop mtpostgres
.PHONY: stop-db

run-db-admin:
	@ echo "---> Running PostgreSQL admin container ..."
	@ docker run --rm --name mtadminer --link mtpostgres:db -p 8082:8080 -d adminer
.PHONY: run-db-adminer

stop-db-admin:
	@ echo "---> Stopping PostgreSQL admin container ..."
	@ docker stop mtadminer
.PHONY: stop-db-adminer