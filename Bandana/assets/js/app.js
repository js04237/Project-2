/* bar chart ) { */
//getting dATA FOR lOCATION
    url = "http://hotline.whalemuseum.org/api.json?limit=10000";
var stringArray = new Array();


/* var dict = {}; */

    d3.json(url).then(function (whaledata) {
		
	{
	for (var i=0;i<whaledata.length;i++){

	 stringArray[i] = whaledata[i].location;
	
	console.log(stringArray[i]);
	}}
	
	
	
	//cOUNTING fREQUENCY oF lOCATION
	
	{
  function frequency(stringArray ) {
  var a = [],
    b = [],
    prev;

  stringArray .sort();
  for (var i = 0; i < stringArray .length; i++) {
    if (stringArray [i] !== prev) {
      a.push(stringArray [i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = stringArray [i];
  }

  return [a, b];
 
}
	}

var result = frequency(stringArray );


 console.log(result[0]);
 console.log(result[1]);
 
 

 // Code for Horizontal bar chat
 
 var data = [{
  type: 'bar',
  x: result[0],
  y: result[1],
  /* orientation: 'h' */
	}];


Plotly.newPlot('barchart', data);
 
 })
 
 
	





