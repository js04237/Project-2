url = "/api/v1.0/mammal_sightings";
d3.json(url).then(function (whaledata) {
	var tdata = whaledata.filter(d => d.hasOwnProperty("sighted_at"));
	var sighted_at = tdata.reduce(function (obj, v) {
		obj[v.sighted_at.slice(5, -18)] = (obj[v.sighted_at.slice(5, -18)] || 0) + 1;
		return obj;
	}, {})
	months_array = ["October", "November", "December", "September", "July", "June", "August", "May", "April", "March", "February", "January"];

	unordered_months = Object.keys(sighted_at);
	unordered_counts = Object.values(sighted_at);


	function reorder_array(array) {
		var array_six = array.slice(0,3);
		var array_five = array.slice(3,4);
		var array_four = array.slice(6,7);
		var array_three = array.slice(4,5);
		var array_two = array.slice(5,6);
		var array_one = array.slice(7,12);
		array_one.reverse();
		delete array;
		var array = array_one.concat(array_two).concat(array_three).concat(array_four).concat(array_five).concat(array_six);
		return array
	};
	months = reorder_array(unordered_months);
	counts = reorder_array(unordered_counts);

var myChart = new Chart(ctx, {
	type: 'bar',
	data: {
		labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		datasets: [{
			data: counts,
			label: "sightings",
			backgroundColor: [
				'#4a4e4d',
				'#4a4e4d',
				'#0e9aa7',
				'#0e9aa7',
				'#0e9aa7',
				'#f6cd61',
				'#f6cd61',
				'#f6cd61',
				'#0392cf',				
				'#0392cf',	
				'#0392cf',
				'#4a4e4d'
			],
			borderColor: [
				'#4a4e4d',
				'#4a4e4d',
				'#0e9aa7',
				'#0e9aa7',
				'#0e9aa7',
				'#f6cd61',
				'#f6cd61',
				'#f6cd61',
				'#0392cf',				
				'#0392cf',	
				'#0392cf',
				'#4a4e4d'
			],
			borderWidth: 1
		}]
	},
	options: {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		},
		title: {
			display: true,
			text: "# of Sightings per Month"
		}
	}
});

});