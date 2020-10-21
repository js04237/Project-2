# Project-2
## Marine Mammal Sightings in the Pacific Northwest & Canada

![K43 Breachl](Images/K43_breach.webp)

## Table of Contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Development Process](#development-process)
* [Data Sources](#data-sources)
* [Contact](#contact)

## Introduction
Our team project was to create a website to help visualize marine mammal sightings by their location, time of year, and social patterns. We predominantly focused on orcas, as all but 5 of our datapoints were orcas. We utilized an API from the Whale Museum, which contained data in geoJSON format as well as city information, pod information, and day of sighting. We scraped the API, pulled it into PostgreSQL, used Sqlalchemy to connect to the database, and rendered our own API and routes using Flask. From here, we were able to build our website and create visualizations using Leaflet and Plotly. Finally, we utilized Heroku to deploy our website through Github. 

## Data Sources

    http://hotline.whalemuseum.org/api.json?limit=10000
    https://www.whaleresearch.com/


## Description

   Rationale: API data contains GeoJSON information to create maps, and the dataset is limited in scope but not too small. There is more data on marine mammal sightings beyond this API, but we didn’t find other data that was easily accessible. Also orcas are endangered, so it is of interest to study their habits and habitats in order to help raise awareness for the orcas.  


            visualizations:
    1.	Use GeoJSON data to map sightings with markers for different species 
    2.	Use GeoJSON data to create a cluster and/or heatmap to visualize more active locations.
    3.	Look at seasonal sightings to map potential migratory patterns of orca pods.
    4.	Compare pod sightings to find where pods overlap and/or how frequently different pods interact together.





## Questions







# Development Team 
1. Katy Luquire
2. Bandana Deo
3. Jonathan Brian Stoger
4. Seidi Mohammad
