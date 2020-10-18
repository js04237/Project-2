function buildPlot(podChoice) {

    url = "http://hotline.whalemuseum.org/api.json?limit=10000";
    d3.json(url).then(function (whaledata) {
        //console.log(whaledata);
        var tdata = whaledata.filter(d => d.hasOwnProperty("orca_pod"));
        console.log(tdata)
        var pod_counts = tdata.reduce(function(obj, v) {
            obj[v.orca_pod] = (obj[v.orca_pod] || 0) + 1;
            return obj;
        }, {})
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
        var data1 = [{
            values: data_values,
            labels: data_labels,
            type: 'pie'
        }]
        var layout = {
            height: 400,
            width: 500
        }
        console.log(data1);
        console.log(layout);
        Plotly.newPlot('piechart', data1, layout);

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
