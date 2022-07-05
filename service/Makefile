SHELL = /bin/bash
WORKDIR := $(PWD)

default: service
.PHONY: default

run:
	@ echo "---> Running Development Environment..."
	@ docker-compose up
.PHONY: run

stop:
	@ echo "---> Stop Development Environment..."
	@ docker-compose down
.PHONY: stop

ps:
	@ echo "---> Running containers..."
	@ docker-compose ps
.PHONY: ps

service:
	@ echo "---> Running service ..."
	@ flask db upgrade
	@ flask run
.PHONY: service