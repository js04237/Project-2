function buildPlot(podChoice) {

url = "http://hotline.whalemuseum.org/api.json?limit=10000";
d3.json(url).then(function(whaledata) {
    // console.log(whaledata);
    j = 0
    k = 0
    l = 0
    jk = 0
    jl = 0
    kl = 0
    jkl = 0
    for (var i = 0; i < whaledata.length; i++) {
        var pod = whaledata[i].orca_pod;
        // console.log(pod)
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
      var j_values = [j, jk, jl, jkl];
      var k_values = [k, jk, kl, jkl];
      var l_values = [l, jl, kl, jkl];
      var j_labels = ['J Pod', "J+K Pods", "J+L Pods", "All Pods"];
      var k_labels = ['K Pod', 'J+K Pods', "K+L Pods", "All Pods"];
      var l_labels = ['L Pod', 'J+L Pods', "K+L Pods", "All Pods"];



// function buildPlot(podChoice) {
    var J_Pod = [j_values, j_labels];
    var K_Pod = [k_values, k_labels];
    var L_Pod = [l_values, l_labels];   
    console.log(podChoice); 
    if (podChoice = "J Pod") {
        data = J_Pod;
    }
    if (podChoice = "K Pod") {
        data = K_Pod
    }
    else  {
        data = L_Pod
    }
      console.log(data);
      
    var data1 = [{
            values: data[0],
            labels: data[1],
            type: 'pie'
            }]
    var layout = {
            height: 400,
            width: 500}
        
    Plotly.newPlot('piechart', data1, layout);
        
    })
};



function optionChanged(podChoice){
    console.log(podChoice);
    buildPlot(podChoice);
}
function update(data){
    buildPlot(data);
};

var pod_names = ["J Pod", "K Pod", "L Pod"];
var dropdown = d3.select("#selDataset");

pod_names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);    
    // console.log(name);
});
var firstPod = pod_names[0];
console.log(firstPod);
buildPlot(firstPod);
// function init() {
//     update(jdata)
// }
// //     for (i = 0; pod_names.length; i++) {
// //         dropdown.append("option").text(pod_names[i]);

// // }};

// init();
