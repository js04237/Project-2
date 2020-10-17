/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4plugins_timeline.SerpentineChart);
chart.curveContainer.padding(50, 20, 50, 20);
chart.levelCount = 4;
chart.yAxisRadius = am4core.percent(25);
chart.yAxisInnerRadius = am4core.percent(-25);
chart.maskBullets = false;

var colorSet = new am4core.ColorSet();
colorSet.saturation = 0.5;

chart.data = [{
    "category": "Module #1",
    "start": "2019-01-10",
    "end": "2019-01-13",
    "color": colorSet.getIndex(0),
    "task": "Gathering requirements"
}, {
    "category": "Module #1",
    "start": "2019-02-05",
    "end": "2019-04-18",
    "color": colorSet.getIndex(0),
    "task": "Development"
}, {
    "category": "Module #2",
    "start": "2019-01-08",
    "end": "2019-01-10",
    "color": colorSet.getIndex(5),
    "task": "Gathering requirements"
}, {
    "category": "Module #2",
    "start": "2019-01-12",
    "end": "2019-01-15",
    "color": colorSet.getIndex(5),
    "task": "Producing specifications"
}, {
    "category": "Module #2",
    "start": "2019-01-16",
    "end": "2019-02-05",
    "color": colorSet.getIndex(5),
    "task": "Development"
}, {
    "category": "Module #2",
    "start": "2019-02-10",
    "end": "2019-02-18",
    "color": colorSet.getIndex(5),
    "task": "Testing and QA"
}, {
    "category": ""
}, {
    "category": "Module #3",
    "start": "2019-01-01",
    "end": "2019-01-19",
    "color": colorSet.getIndex(9),
    "task": "Gathering requirements"    
}, {
    "category": "Module #3",
    "start": "2019-02-01",
    "end": "2019-02-10",
    "color": colorSet.getIndex(9),
    "task": "Producing specifications"
}, {
    "category": "Module #3",
    "start": "2019-03-10",
    "end": "2019-04-15",
    "color": colorSet.getIndex(9),
    "task": "Development"
}, {
    "category": "Module #3",
    "start": "2019-04-20",
    "end": "2019-04-30",
    "color": colorSet.getIndex(9),
    "task": "Testing and QA"
}, {
    "category": "Module #4",
    "start": "2019-01-15",
    "end": "2019-02-12",
    "color": colorSet.getIndex(15),
    "task": "Gathering requirements"
}, {
    "category": "Module #4",
    "start": "2019-02-25",
    "end": "2019-03-10",
    "color": colorSet.getIndex(15),
    "task": "Development"
}, {
    "category": "Module #4",
    "start": "2019-03-23",
    "end": "2019-04-29",
    "color": colorSet.getIndex(15),
    "task": "Testing and QA"
}];

chart.dateFormatter.dateFormat = "yyyy-MM-dd";
chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
chart.fontSize = 11;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.labels.template.paddingRight = 25;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.innerRadius = -60;
categoryAxis.renderer.radius = 60;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 70;
dateAxis.baseInterval = { count: 1, timeUnit: "day" };
dateAxis.renderer.tooltipLocation = 0;
dateAxis.startLocation = -0.5;
dateAxis.renderer.line.strokeDasharray = "1,4";
dateAxis.renderer.line.strokeOpacity = 0.6;
dateAxis.tooltip.background.fillOpacity = 0.2;
dateAxis.tooltip.background.cornerRadius = 5;
dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
dateAxis.tooltip.label.paddingTop = 7;

var labelTemplate = dateAxis.renderer.labels.template;
labelTemplate.verticalCenter = "middle";
labelTemplate.fillOpacity = 0.7;
labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
labelTemplate.background.fillOpacity = 1;
labelTemplate.padding(7, 7, 7, 7);

var series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
series.columns.template.height = am4core.percent(20);
series.columns.template.tooltipText = "{task}: [bold]{openDateX}[/] - [bold]{dateX}[/]";

series.dataFields.openDateX = "start";
series.dataFields.dateX = "end";
series.dataFields.categoryY = "category";
series.columns.template.propertyFields.fill = "color"; // get color from data
series.columns.template.propertyFields.stroke = "color";
series.columns.template.strokeOpacity = 0;

var bullet = series.bullets.push(new am4charts.Bullet());
var triangle = bullet.createChild(am4core.Triangle);
triangle.width = 10;
triangle.height = 10;
triangle.propertyFields.fill = "color";
triangle.propertyFields.stroke = "color";
triangle.verticalCenter = "bottom";
triangle.horizontalCenter = "middle";
bullet.locationX = 0;
bullet.adapter.add("rotation", (value, target) => {
  if (target.dataItem) {
    var position = dateAxis.valueToPosition(target.dataItem.dateX.getTime());
    return dateAxis.renderer.positionToAngle(position);
  }
  return value;
});

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.align = "center"
chart.scrollbarX.width = am4core.percent(85);

var cursor = new am4plugins_timeline.CurveCursor();
chart.cursor = cursor;
cursor.xAxis = dateAxis;
cursor.yAxis = categoryAxis;
cursor.lineY.disabled = true;
cursor.lineX.strokeDasharray = "1,4";
cursor.lineX.strokeOpacity = 1;

dateAxis.renderer.tooltipLocation2 = 0;
categoryAxis.cursorTooltipEnabled = false;


