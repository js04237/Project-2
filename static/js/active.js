function buildPlots(locChoice) {
    // url = "http://hotline.whalemuseum.org/api.json?limit=10000";
    url = "/api/v1.0/mammal_sightings";

    d3.json(url).then(function (whaledata) {
        var tdata = whaledata.filter(d => d.hasOwnProperty("location"));
        var locations = tdata.reduce(function (obj, v) {
            obj[v.location] = (obj[v.location] || 0) + 1;
            return obj;
        }, {})
        var sort_locations = Object.keys(locations).map(function (key) {
            return [key, locations[key]];
        });
        sort_locations.sort(function (first, second) {
            return second[1] - first[1];
        });
        top_locations = sort_locations.slice(0, 11).reverse();

        // delete object with no location information. 
        delete top_locations[9];
        var final_locations = []
        var sightings = []
        top_locations.forEach(function (place) {
            var substring = place[0].slice(0, -4);
            final_locations.push(substring);
            sightings.push(place[1]);
        })

        var trace = {
            x: sightings,
            y: final_locations,
            type: "bar",
            orientation: "h",
            marker: {
                color: "#0e9aa7",
            },
            // text: bar_hovertext,
        };
        var data = [trace];
        var layout = {
            title: "Locations with Most Sightings",
            xaxis: {
                title: "Number of Sightings"
            },
            yaxis: {
                automargin: true,
                ticks: 'outside',
            }
        };
        // plot bar chart
        Plotly.newPlot("bar", data, layout);
        var filter_data = {};
        var filter_value = locChoice === "Seattle, WA" ? "Seattle, WA, US" : locChoice === "Delta, BC" ? "Delta, BC, CA" : locChoice === "Port Renfrew, BC" ? "Port Renfrew, BC, CA" : locChoice === "Mayne Island, BC" ? "Mayne Island, BC, CA" : locChoice === "Victoria, BC" ? "Victoria, BC, CA" : locChoice === "Sooke, BC" ? "Sooke, BC, CA" : locChoice === "Juan de Fuca, BC" ? "Juan de Fuca, BC, CA" : locChoice === "Pender Island, BC" ? "Pender Island, BC, CA" : locChoice === "Saturna, BC" ? "Saturna, BC, CA" : "Friday Harbor, WA, US"
        Object.entries(tdata).forEach((v) => {
            if (v.includes(filter_value)) {
                filter_data = tdata;
            }
        });

        var filteredData = tdata.filter(sighting => sighting.location === filter_value)
        var tableData = []
        for (var i = 0; i < filteredData.length; i++) {
            delete filteredData[i].id
            delete filteredData[i].created_at
            delete filteredData[i].orca_type
            delete filteredData[i].quantity
            delete filteredData[i].updated_at
            delete filteredData[i].url
            delete filteredData[i].description
            delete filteredData[i].orca_pod
            tableData.push(filteredData[i])
        }

        for (var i = 0; i < tableData.length; i++) {
            var lon = tableData[i].longitude
            var lat = tableData[i].latitude
            var date_time = tableData[i].sighted_at
            var long = lon.toFixed(2)
            var lati = lat.toFixed(2)
            var date = date_time.slice(0, -15)
            tableData[i].longitude = long
            tableData[i].latitude = lati
            tableData[i].sighted_at = date
        }
        // clear html table
        var tbody = d3.select("tbody");
        tbody.html("");

        var tr = d3.select("tr");

        tableData.forEach((sighting) => {
            var row = tbody.append("tr");
            Object.entries(sighting).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    });
};



function optionChanged(locChoice) {
    buildPlots(locChoice);
}
function update(data) {
    buildPlots(data);
};
function init() {

    var locations = ["Seattle, WA", "Delta, BC", "Port Renfrew, BC", "Mayne Island, BC", "Victoria, BC", "Sooke, BC", "Juan de Fuca, BC", "Pender Island, BC", "Saturna, BC", "Friday Harbor, WA"]
    var dropdown = d3.select("#selDataset");
    locations.forEach(function (name) {
        dropdown.append("option").text(name).property("value", name);
        // console.log(name);
    });
    var firstLoc = locations[0];
    buildPlots(firstLoc);
}
init();


