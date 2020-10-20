url = "http://hotline.whalemuseum.org/api.json?limit=10000";
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

    console.log(tdata);
    var loc = "Saturna, BC, CA"
    tdata = tdata.filter(sighting => sighting.location === loc);
    console.log(tdata);
    var sighted_at = tdata.reduce(function (obj, v) {
        obj[v.sighted_at.slice(5, -13)] = (obj[v.sighted_at.slice(5, -13)] || 0) + 1;
        return obj;
    }, {})
    console.log(sighted_at)
    months_str = Object.keys(sighted_at);
    counts = Object.values(sighted_at);

    console.log(months_str);
    console.log(counts);
    // var months = months_str.map(function(x){
    //     return parseInt(x,10);
    // })
    // console.log(months);

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
        title: "Sightings by Month",
        xaxis:{
            title: "Month"
        },
        yaxis:{
            title: "Number of Sightings"
        },
        height: 750,
        width: 1050
    }
    Plotly.newPlot("bubble", data1, layout1);

    var species = tdata.reduce(function (obj, v) {
        obj[v.species] = (obj[v.species] || 0) + 1;
        return obj;
    }, {})
    console.log(species);

    });

    // var final_locations = []
    // var sightings = []
    // top_locations.forEach(function (place) {
    //     var substring = place[0].slice(0, -4);
    //     final_locations.push(substring);
    //     sightings.push(place[1]);
    // })

    //////////////////////////////////////////////////
    // GETTING MONTH DATA // 
    // url = "http://hotline.whalemuseum.org/api.json?limit=10000";
    // d3.json(url).then(function (whaledata) {
    // console.log(whaledata);
    // var tdata = whaledata.filter(d => d.hasOwnProperty("sighted_at"));
    // console.log(tdata);
    // var sighted_at = tdata.reduce(function (obj, v) {
    //     obj[v.sighted_at.slice(5, -13)] = (obj[v.sighted_at.slice(5, -13)] || 0) + 1;
    //     return obj;
    // }, {})
    // console.log(sighted_at)
// });

//     try {
//         for (i = 0; tdata.length; i++) {
//             // var dates = [];
//             var months = []
//             var sighting = tdata[i];
//             var date = sighting.sighted_at;
//             var month = date.slice(5, 7);
//             months.push(month);
//             console.log(month);
//         } catch (error) {
//             console.log(error)
//         };
//         console.log(months)
//     });