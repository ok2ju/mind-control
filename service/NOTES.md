## Links

- Python code convention (PEP-0008) - [link](https://peps.python.org/pep-0008/)
- Work with postgres in python - [link](https://stackabuse.com/using-sqlalchemy-with-flask-and-postgresql/)
- Flask tutorial - [link](https://pythonbasics.org/flask-tutorial-hello-world/)
- Virtual environments article - [linl](https://docs.python-guide.org/dev/virtualenvs/#virtualenvironments-ref)
- Black, flake8, pylint [link](http://www.sefidian.com/2021/08/03/how-to-use-black-flake8-and-isort-to-format-python-codes/)
- Microservice scaffold [link](https://github.com/python-microservices/microservices-scaffold)

## TODO

- ~~Consider to use `pyenv` (Pipfile)~~;
- ~~Configure app via env variables~~;
- ~~Add logging~~;
- ~~Add swagger UI service (docker image)~~;
- ~~Use docker compose~~;
- ~~Folder structure~~;
- Add Black, flake8, pylint;

## Docker (legacy)

- docker run --rm --name mtpostgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
- docker run --rm --name mtadminer --link mtpostgres:db -p 8082:8080 -d adminer

Adminer login:
Server: db (as it linked under `db` name)
Username: postgres
Password: password
