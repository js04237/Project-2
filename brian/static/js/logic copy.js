function createMap(sightingMarkers) {

  // Create the tile layers that will be the background of our map
  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 12,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Incomplete - this needs more detail
  // var bigQuakes = new L.layerGroup()

  // d3.json(url2, function(data) {
  //   // Creating a geoJSON layer with the retrieved data
  //   plateBoundary = L.geoJson(data, {
  //     // Style each feature
  //     style: function(feature) {
  //       return {
  //         color: "orange",
  //         weight: 3
  //       };
  //     }
  //   }).addTo(bigQuakes);
  // })

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightMap
  };

  // Create the map object with options
  var map = L.map("mapid", {
    center: [48.5, -123.7],
    zoom: 8,
    layers: [lightMap, sightingMarkers]
  });

  // Create a layergroup for the clusters
  var quakeClusters = new L.markerClusterGroup()

  // Loop through data
  for (var i = 0; i < locations.length; i++) {

    // Set the data location property to a variable
    var location = locations[i];
    // Add each location to the layergroup
    quakeClusters.addLayer(L.marker(location))
    
  }

  // Create the heatmap layer
  var heat = L.heatLayer(locations, {
    radius: 25,
    blur: 35,
    max: 0.005
  });

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Marine Mammal Sightings": sightingMarkers,
    // "Tectonic Plate Boundaries": tectonicPlates,
    // "Cluster Map (Past Week)": quakeClusters,
    // "Heatmap (Past Week)": heat,
    // "Quakes > 4.5 Mag in the Past 30 Days": bigQuakes
  };

  sightingMarkers.on('mouseover', function(event) {
    sightingMarkers.openPopup();
  })
  sightingMarkers.on('mouseout', function(event) {
    sightingMarkers.closePopup();
  })
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(map);

  // var legend = L.control({position: 'bottomright'});

  // // Setup the legend
  // legend.onAdd = function (map) {
  //   // Match the legend colors to the earthquake circle colors
  //   var div = L.DomUtil.create('div', 'info legend'),
  //     depthRanges = [0, 10, 30, 60, 100, 160],
  //     labels = [];

  //   // loop through our quake depth intervals and generate a label with a colored square for each interval
  //   div.innerHTML = "Earthquake</br> Depth (km)</br>"
  //   for (var i = 0; i < depthRanges.length; i++) {
  //     div.innerHTML +=
  //       '<i style="background:' + getColor(depthRanges[i] + 1) + '"></i> ' +
  //       depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
  //   }

  //   return div;
  // };
  // // Add the legend to the map
  // legend.addTo(map);

  // // Add the legend to the map when 'Earthquake Locations' are selected
  // map.on('overlayadd', function(eventLayer) {
  //   if (eventLayer.name === 'Earthquake Locations') {
  //       map.addControl(legend);
  //   } 
  // });
  
  // // Remove the legend to the map when 'Earthquake Locations' are de-selected
  // map.on('overlayremove', function(eventLayer){
  //   if (eventLayer.name === 'Earthquake Locations'){
  //       map.removeControl(legend);
  //   } 
  // });

}

// Create a container for coordinates that will be passed to the heatmap layer
var locations = []

function plotSightings(response) {
  
  // Get Quake data from the response
  data = response
  // var quakes = response.features;

  // Initialize an array to hold bike markers
  var sightingMarkers = [];

  var porpoise = "static/icons/porpoise.png"
  var humpback = "static/icons/humpback.png"
  var grayWhale = "static/icons/gray_whale.png"
  var orca = "static/icons/orca.png"

  // Loop through the stations array
  for (var i = 0; i < data.length; i++) {
    var sighting = data[i];
    var lon = sighting.longitude;
    var lat = sighting.latitude;
    var species = sighting.species;
    var place = sighting.location;
    var date = Date(sighting.sighted_at)
    var icon = "";

    if (species == "orca") {
      myIcon = L.icon({
        iconUrl: orca,
        iconSize: [30, 30]})
    }
    if (species == "humpback") {
      myIcon = L.icon({
        iconUrl: humpback,
        iconSize: [30, 30]})
    }
    if (species == "gray whale") {
      myIcon = L.icon({
        iconUrl: grayWhale,
        iconSize: [30, 30]})
    }
    else if (species == "harbor porpoise") {
      myIcon = L.icon({
        iconUrl: porpoise,
        iconSize: [30, 30]})
    }

    locations.push([lat, lon]);

    // For each sighting, create a marker and bind a popup with the sighting info
    sightingMarker = L.marker([lat, lon], {
      icon: myIcon
    })
      // Create the popup text
      .bindPopup("<h3>Species: " + species + "</h3>" + 
      "<h3>Place: " + place + "</h3>" +
      "<h3>Date: " + date + "</h3>")
     ;

    // Markers appear on mouseover
    sightingMarker.on("mouseover", function(e) {
      this.openPopup()
    });
    sightingMarker.on("mouseout", function(e) {
      this.closePopup()
    });

    // Add each marker to an array
    sightingMarkers.push(sightingMarker);
  }

  // Create a layer group made from the sightings markers array, pass it into the createMap function
  createMap(L.layerGroup(sightingMarkers));
}

// Returns the circleColor and used to build the legend
function getColor(d) {

  if (d < 10) {
    return "#00FF00";
  }
  else if (d < 30) {
    return "#ADFF2F";
  }
  else if (d < 60) {
    return "#FFFF00";
  }
  else if (d < 100) {
    return "#FFA500";
  }
  else if (d < 160) {
    return "#FF6133";
  }
  else {
    return "#FF0000";
  }
}

// Marine mammal sightings website
url = "http://hotline.whalemuseum.org/api.json?&limit=10000"

// Perform an API call to the website to create markers
d3.json(url, plotSightings);
