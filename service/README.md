# MindTracker Python REST service

...

# Prerequisites

1. Install PostgreSQL docker image
2. ...

# Available commands

```sh
$ make run # runs development environment
$ make stop # stop development environment
$ make ps # check running services

$ make service # runs REST service (:5000)
```

# Running service

1. Run development environment (database, db-adminer) using `make run` command
2. A python virtual environment should be created and activated

```sh
$ python3 -m venv venv
$ source venv/bin/activate
$ deactivate # Used to deactivate env
```

3. Run service using `make service` command

# Notes

Install python deps:
```sh
$ pip install -r requirements.txt
```

Freeze python deps:
```sh
$ pip freeze > requirements.txt
```

Install python package:
```sh
$ pip install package_name
```

Init database:
```sh
$ flask db init # create a migration repository
```

Run migration:
```sh
$ flask db migrate -m "Initial migration" # generate migration
$ flask db upgrade # apply the migration to the database
```

In case we add, delete, or change any columns, we can always execute the migrate and upgrade commands to reflect these changes in our database too.

Run application:
```sh
$ flask run
```