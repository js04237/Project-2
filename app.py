# Import SQLAlchemy and other dependencies here
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
from sqlalchemy import Column, Float, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_cors import CORS

# from models import create_classes
import os

Base = declarative_base()

# Establish PG db connection
engine = create_engine('postgres://tiwnawxydwsxea:aeec74130473d7517ee693acdfeeefd7be826824b1c691d7fca87c08719c36f8@ec2-3-81-240-17.compute-1.amazonaws.com:5432/d7mb0dofadlgjk')
connection = engine.connect()

#create marine_mammal class
class marine_mammal(Base):
    __tablename__ = 'marine_mammal'
    
    id = Column (String, primary_key=True)
    species = Column (String)
    quantity = Column (Integer)
    description = Column (String)
    url = Column (String)
    latitude = Column (Float)
    longitude = Column (Float)
    location = Column (String)
    sighted_at = Column (String)
    created_at = Column (String)
    updated_at = Column (String)
    orca_type = Column (String)
    orca_pod = Column (String)

session = Session(engine)

# Flask Setup
app = Flask(__name__)
CORS(app)

# Read the SQL data as a DataFrame
marine_mammal_data = pd.read_sql("select * from marine_mammal", connection)

# Lambda functiont to jsonify each row of the DataFrame
json_data = marine_mammal_data.apply(lambda x: x.to_json(), axis=1)

# Create a new variable to hold the json data to be displayed on the webpage
json_string = ""

# Loop through the jsonified data and add a comma after each element except the last
for ele in json_data[:-1]:
    json_string += ele + ","

# Add the last element to the string
for ele in json_data[-1:]:
    json_string += ele

# Flask Routes
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/v1.0/mammal_sightings")
def mammal_sightings():

    return "[" + json_string + "]"

    session.close()

@app.route("/pods.html")
def pods():
    return render_template("pods.html")

@app.route("/locations.html")
def locations():
    return render_template("locations.html")

@app.route("/method.html")
def method():
    return render_template("method.html")

@app.route("/orca_quick_facts.html")
def orca_quick_facts():
    return render_template("orca_quick_facts.html")

@app.route("/active.html")
def active():
    return render_template("active.html")

@app.route("/seasonal.html")
def seasonal():
    return render_template("seasonal.html")


if __name__ == "__main__":
    app.run(debug=True)