// Create the tile layers that will be the background of our map
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 12,
  id: "light-v10",
  accessToken: API_KEY
});

var layers = {
  orca: new L.LayerGroup(),
  grayWhale: new L.LayerGroup(),
  porpoise: new L.LayerGroup(),
  humpback: new L.LayerGroup(),
};

// Create the map object with options
var map = L.map("mapid", {
  center: [48.5, -123.7],
  zoom: 8,
  layers: [
    layers.orca,
    layers.grayWhale,
    layers.porpoise,
    layers.humpback
  ]
});

// Add our 'lightmap' tile layer to the map
lightMap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Orcas": layers.orca,
  "Gray Whales": layers.grayWhale,
  "Harbor Porpoises": layers.porpoise,
  "Humpback Whales": layers.humpback
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  orca: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
  }),
  grayWhale: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  porpoise: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
  }),
  humpback: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  })
};

function plotSightings(response) {

  var sightingCount = {
    orca: 0,
    grayWhale: 0,
    porpoise: 0,
    humpback: 0,
  };
  console.log(response)
  data = response
  
  var speciesCode;

  // Loop through the stations array
  for (var i = 0; i < data.length; i++) {
    var sighting = data[i];
    var lon = sighting.longitude;
    var lat = sighting.latitude;
    var species = sighting.species;
    var place = sighting.location;
    var date = Date(sighting.sighted_at)

    if (species == "orca") {
      speciesCode = "orca"
    }
    if (species == "gray whale") {
      speciesCode = "grayWhale"
    }
    if (species == "harbor porpoise") {
      speciesCode = "porpoise"
    }
    else if (species == "humpback whale") {
      speciesCode = "humpback"
    }

    sightingCount[speciesCode]++;

    var newMarker = L.marker([lat, lon], {
      icon: icons[speciesCode]
    });
    
    // Add the new marker to the appropriate layer
    newMarker.addTo(layers[speciesCode]);
  
    newMarker.bindPopup("<h3>Species: " + species + "</h3>" + 
      "<h3>Place: " + place + "</h3>" +
      "<h3>Date: " + date + "</h3>")
      ;

    //   newMarker.on("mouseover", function(e) {
    //   this.openPopup()
    // });
    // newMarker.on("mouseout", function(e) {
    //   this.closePopup()
    // });

    newMarker.addTo(layers[speciesCode]);
    // Markers appear on mouseover

    // Add each marker to an array
    // sightingMarkers.push(sightingMarker);
  }

  // Create a layer group made from the sightings markers array, pass it into the createMap function
  // createMap(L.layerGroup(newMarker));
}

// Marine mammal sightings website
url = "http://hotline.whalemuseum.org/api.json?&limit=10000"

// Perform an API call to the website to create markers
d3.json(url, plotSightings);
