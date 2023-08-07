# grade
MVP school grading system

#### Clone the repo.
#### Create a virtual env; use this command: python -m venv env
#### Initialize the virtual env; use this command for Unix/Linux systems: source env/bin/activate
#### Install the requirements.txt: python -m pip install -r requirements.txt
#### Create a PostGRESQL database; on your terminal, run: 'psql' then, 'create DATABASE grade;' exit postgres by '\q' and press enter
#### Run migrations: python manage.py makemigrations && python manage.py migrate
#### Create a superuser: python manage.py createsuperuser
#### Start the server: python manage.py runserver

## How to use fixtures(recommended)
#### Create at least 3 users, whether by django admin or signup via frontend then run this command:
#### python manage.py loaddata courses.json

### If you have trouble insalling the requirements.txt, install the packages individually; this means, run 'pip install '[package_name]''
