# iPlix - Scrap (Beautify)


Scrapping web stream movie using BeautifulSoup4 , Requests, flask and flask_sqlalchemy

## Installation Requierements

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install requirements.

```bash
pip3 install flask
pip3 install flask_cors
pip3 install flask_sqlalchemy
pip3 install requests
pip3 install BeautifulSoup4
pip3 install virtualenv
```

## Usage

```bash
virtual env #make virtualenv
source env/bin/activate #activate virtualenv
export FLASK_APP=api.py #adding our file
export FLASK_ENV=development #for debugging
python3 -m flask run
```
