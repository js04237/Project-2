function buildPlot(podChoice) {

    // url = "http://hotline.whalemuseum.org/api.json?limit=10000";
    url = "/api/v1.0/mammal_sightings";
    d3.json(url).then(function (whaledata) {
        //console.log(whaledata);
        var tdata = whaledata.filter(d => d.hasOwnProperty("orca_pod"));
        console.log(tdata)
        j = 0
        k = 0
        l = 0
        jk = 0
        jl = 0
        kl = 0
        jkl = 0
        for (var i = 0; i < tdata.length; i++) {
            var pod = whaledata[i].orca_pod;
            console.log(pod)
            if (pod == "j") {
                j = j +1;
            }
            if (pod == "k") {
                k = k +1;
            }
            if (pod == "l") {
                l = l +1;
            }
            if (pod == "j, k") {
                jk = jk +1;
            }
            if (pod == "j, l") {
                jl = jl +1;
            }
            if (pod == "k, l") {
                kl = kl +1;
            }
            if (pod == "j, k, l") {
                jkl = jkl +1;
            }
        }
        var pod_counts = tdata.reduce(function(obj, v) {
            obj[v.orca_pod] = (obj[v.orca_pod] || 0) + 1;
            return obj;
        }, {})
        delete pod_counts.null;
        console.log(pod_counts);
        console.log(podChoice);
        var final_data = {};
        var filter_value = podChoice === "J Pod" ?
            "j" : podChoice === "K Pod" ? "k" : 
            "l"
        Object.keys(pod_counts).forEach((k) => {
            if(k.includes(filter_value)) {
                final_data[k] = pod_counts[k];
            }
        });

        console.log(filter_value)
        console.log(final_data)


        var data_labels = [];
        var data_values = [];
        Object.keys(final_data).forEach((k) => {
            data_labels.push(k);
            data_values.push(final_data[k])
        })
        // var ultimateColors = ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'];
        var colors = ["#4a4e4d", '#0e9aa7', '#f6cd61', '#0392cf', '#bbbbbb']
        var data1 = [{
            values: data_values,
            labels: data_labels,
            marker: {
                colors: colors
              },
            type: 'pie'
        }]
        var layout = {
            height: 500,
            width: 600,
            title: {
                text: 'Percentage of Sightings by Pod',
            },
        }
        console.log(data1);
        console.log(layout);
        Plotly.newPlot('piechart', data1, layout);

        var j_total = jk + jl + jkl;
        var k_total = jk + kl + jkl;
        var l_total = jl + kl + jkl;
    
        var trace1 = {
            x: ['J Pod', 'K Pod', 'L Pod'],
            y: [j, k, l],
            name: 'Solo Sightings',
            type: 'bar',
            marker: {
                color: "#0e9aa7"
              },
          };
        
          var trace2 = {
            x: ['J Pod', 'K Pod', 'L Pod'],
            y: [j_total, k_total, l_total],
            name: 'With Other pods',
            type: 'bar',
            marker: {
                color: "#bbbbbb"
              },
          };
          var data = [trace1, trace2];
          var layout = {
              title: {
                  text: 'Sightings With Other Pods',
              },
            height: 500,
            width: 600
        }
      
          //   var layout = {barmode: 'group'};
            Plotly.newPlot('barchart', data, layout);
    

    })
};

function optionChanged(podChoice) {
    console.log(podChoice);
    buildPlot(podChoice);
}
function update(data) {
    buildPlot(data);
};


function init() {
    var pod_names = ["J Pod", "K Pod", "L Pod"];
    var dropdown = d3.select("#selDataset");
    pod_names.forEach(function (name) {
        dropdown.append("option").text(name).property("value", name);
        // console.log(name);
    });
    var firstPod = pod_names[0];
    console.log(firstPod);
    buildPlot(firstPod);

}

init();
