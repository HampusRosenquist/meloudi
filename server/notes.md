# Start PostgreSQL
sudo apt install postgresql
sudo systemctl start postgresql

### Enter CLI
sudo -i -u postgres
psql

# Django

### Migrations
python manage.py makemigrations music (as hampus)
(python manage.py sqlmigrate music 0001)
python manage.py migrate (as postgres)