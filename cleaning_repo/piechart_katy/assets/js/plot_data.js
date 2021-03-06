url = "http://hotline.whalemuseum.org/api.json?limit=10000";
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
    console.log(j.value)
    var j_total = jk + jl + jkl;
    var k_total = jk + kl + jkl;
    var l_total = jl + kl + jkl;

    var trace1 = {
        x: ['J Pod', 'K Pod', 'L Pod'],
        y: [j, k, l],
        name: 'Solo Sightings',
        type: 'bar'
      };
    
      var trace2 = {
        x: ['J Pod', 'K Pod', 'L Pod'],
        y: [j_total, k_total, l_total],
        name: 'Sightings with other pods',
        type: 'bar'
      };

      // var trace3 = {
      //   x: ['J Pod', 'K Pod', 'L Pod'],
      //   y: [jl, kl, kl],
      //   name: 'LA Zoo',
      //   type: 'bar'
      // };

      
      // var trace4 = {
      //   x: ['J Pod', 'K Pod', 'L Pod'],
      //   y: [j, k, l],
      //   name: 'SF Zoo',
      //   type: 'bar'
      

      var data = [trace1, trace2];
      
    //   var layout = {barmode: 'group'};
      Plotly.newPlot('my_dataviz', data, layout);


      var j_labels = ['J Pod', "J+K Pods", "J+L Pods", "All Pods"];
      var k_labels = ['K Pod', 'J+K Pods', "K+L Pods", "All Pods"];
      var l_labels = ['L Pod', 'J+L Pods', "K+L Pods", "All Pods"];



      console.log(j_total);
      console.log(k_total);
      console.log(l_total);

      var data2 = [{
        values: [j, k, l, jk, jl, kl, jkl],
        labels: ['J Pod', 'K Pod', 'L Pod', 'J+K Pod', 'J+L Pod', 'K+L Pod', "J+K+L Pod"],
        type: 'pie'
      }];
      
      var layout = {
        height: 400,
        width: 500
      };

      Plotly.newPlot('my_piechart', data2, layout);

  
    // var data3 = [{
    //         values: j_values,
    //         labels: j_labels,
    //         type: 'pie'
    //         }]
    // var layout = {
    //         height: 400,
    //         width: 500}
        
    // Plotly.newPlot('piechart', data3, layout);
        

});

// var jdata = [j_values, j_labels];
// var kdata = [k_values, k_labels];
// var ldata = [l_values, l_labels];

function update(data){

var data = data;
var data3 = [{
    values: data[0],
    labels: data[1],
    type: 'pie'
    }]
var layout = {
    height: 400,
    width: 500}

Plotly.newPlot('piechart', data3, layout);
};
var pod_names = ["J Pod", "K Pod", "L Pod"];
