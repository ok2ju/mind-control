from dotenv import load_dotenv

load_dotenv('.env')

from app import create_app, db

app = create_app()

@app.cli.command()
def init_db():
    db.create_all()
    print('The database has been created')

@app.cli.command()
def drop_db():
    db.drop_all()
    print('The database has been deleted')

if __name__ == '__main__':
    app.run(debug = True)
