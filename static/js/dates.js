function buildPlots(locChoice) {
    // url = "http://hotline.whalemuseum.org/api.json?limit=10000";
    url = "/api/v1.0/mammal_sightings";

    d3.json(url).then(function (whaledata) {
        console.log(whaledata);
        var tdata = whaledata.filter(d => d.hasOwnProperty("location"));
        console.log(tdata)
        var locations = tdata.reduce(function (obj, v) {
            obj[v.location] = (obj[v.location] || 0) + 1;
            return obj;
        }, {})
        console.log(locations);
        var sort_locations = Object.keys(locations).map(function (key) {
            return [key, locations[key]];
        });
        sort_locations.sort(function (first, second) {
            return second[1] - first[1];
        });
        top_locations = sort_locations.slice(0, 11).reverse();

        console.log(top_locations);
        // delete object with no location information. 
        delete top_locations[9];
        var final_locations = []
        var sightings = []
        top_locations.forEach(function (place) {
            var substring = place[0].slice(0, -4);
            final_locations.push(substring);
            sightings.push(place[1]);
        })

        console.log(final_locations);
        console.log(sightings);

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
            if(v.includes(filter_value)) {
                filter_data = tdata;
            }
        });
        console.log(filter_value);


        // console.log(tdata);
        filteredData = tdata.filter(sighting=> sighting.location === filter_value)
        console.log(filteredData)
        // var loc = ""
        // tdata = tdata.filter(sighting => sighting.location === loc);
        console.log(tdata);
        var sighted_at = filteredData.reduce(function (obj, v) {
            obj[v.sighted_at.slice(5, -18)] = (obj[v.sighted_at.slice(5, -18)] || 0) + 1;
            return obj;
        }, {})
        console.log(sighted_at)
        months_str = Object.keys(sighted_at);
        counts = Object.values(sighted_at);
        months_array = ["October", "November", "December", "September", "July", "June", "August", "May", "April", "March", "February", "January"];

        console.log(months_str);
        console.log(counts);

        var trace1 = {
            x: months_str,
            y: counts,
            mode: 'markers',
            marker: {
                size: counts,
            }
        };

        var data1 = [trace1]
        var layout1 = {
            title: filter_value,
            xaxis: {
                title: "Month"
            },
            yaxis: {
                title: "Number of Sightings"
            },
            height: 750,
            width: 1050
        }
        Plotly.newPlot("bubble", data1, layout1);
    });
};



function optionChanged(locChoice) {
    console.log(locChoice);
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
    console.log(firstLoc);
    buildPlots(firstLoc);
}
init();


