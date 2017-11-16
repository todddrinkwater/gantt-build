dataset =  [
  {
    id: 1,
    taskName: "Task 1",
    startDate: new Date(2017, 0, 1),
    endDate: new Date(2017, 5, 1),
    milestone: false,
    dependentsId: 1,
    status: "Complete"
  },
  {
    id: 2,
    taskName: "Task 2",
    startDate: new Date(2017, 1, 12),
    endDate: new Date(2017, 2, 3),
    milestone: false,
    dependentsId: 1,
    status: "In Progress"
  },
  {
    id: 3,
    taskName: "Task 3",
    startDate: new Date(2017, 5, 1),
    endDate: new Date(2017, 5, 1),
    milestone: true,
    dependentsId: 3,
    status: "In Progress"
  },
  {
    id: 4,
    taskName: "Task 4",
    startDate: new Date(2017, 5, 11),
    endDate: new Date(2017, 11, 27),
    milestone: false,
    dependentsId: 4,
    status: "In Progress"
  },
  {
    id: 5,
    taskName: "Task 5",
    startDate: new Date(2017, 10, 11),
    endDate: new Date(2018, 11, 27),
    milestone: false,
    dependentsId: 4,
    status: "In Progress"
  },
  {
    id: 6,
    taskName: "Task 6",
    startDate: new Date(2018, 11, 27),
    endDate: new Date(2018, 11, 27),
    milestone: true,
    dependentsId: 6,
    status: "Complete"
  },
  {
    id: 7,
    taskName: "Task 7",
    startDate: new Date(2018, 0, 1),
    endDate: new Date(2018, 2, 3),
    milestone: false,
    dependentsId: 7,
    status: "In Progress"
  },
  {
    id: 8,
    taskName: "Task 8",
    startDate: new Date(2018, 2, 1),
    endDate: new Date(2018, 3, 20),
    milestone: false,
    dependentsId: 8,
    status: "In Progress"
  },
  {
    id: 9,
    taskName: "Task 9",
    startDate: new Date(2018, 3, 01),
    endDate: new Date(2018, 4, 27),
    milestone: false,
    dependentsId: 9,
    status: "In Progress"
  },
  {
    id: 10,
    taskName: "Task 10",
    startDate: new Date(2018, 3, 11),
    endDate: new Date(2018, 5, 27),
    milestone: false,
    dependentsId: 10,
    status: "In Progress"
  }
];


//Calculate the spread of the graph
  // calculate min start dates

var minDate = d3.extent(dataset, (d) => { return d.startDate })[0];
var maxDate = d3.extent(dataset, (d) => { return d.endDate })[1];

var maxTaskNumberId = d3.extent(dataset, (d) => { return d.id })[1];

// Create SVG and set dimensions
var w = 1200,
    graphWidth = (w / 4) * 3,
    h = w / 2,
    tableLeft = w / 4;


// Scale X-axis by date-time
var xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, graphWidth])


var lowYRange = h / 10,
    highYRange = h / 1.07142857

var yScale = d3.scaleLinear()
                .domain([1, 10])
                .range([lowYRange, highYRange])


function scaleXAxisRect(startDate){
  return xScale(startDate)
}

function scaleRectWidth(startDate, endDate){
  return xScale(endDate) - xScale(startDate)
}

function scaleYAxis(taskId){
  return yScale(taskId)
}

function colorPicker(data){
    if (data.milestone === true){ return "rgba(0, 0, 0, 0)" }
    return "rgba(" + (data.dependentsId * 30) + "," + (data.dependentsId * 10) +  ", 60, 1)"
}

function diamondFill(milestone){
  if(milestone === true){
    return "#3FBFBF"
  }
  else return "rgba(64, 200, 124, 0)"
}

function colorArrowHead(data){
  if(data.dependentsId != data.id){
    return "rgb(64, 87, 124)"
  }
  else return "rgba(0, 0, 0, 0)"
}

function lineColorPicker(data){
  if(data.dependentsId != data.id) return "rgb(64, 87, 124)"
  else return "rgba(0, 0, 0, 0)"
}

function line2X1Scale(data){
  return xScale(data.startDate)
}

function line2X2Scale(data, dataset){
  var dependentId = data.dependentsId
  return xScale(dataset[dependentId - 1].startDate)
}

function lineY2Scale(data){
  var dependentId = data.dependentsId
  return yScale(data.dependentsId)
}

function lineXScale(data, dataset){
  var dependentId = data.dependentsId
  return xScale(dataset[dependentId - 1].startDate)
}

function calcRhombusPoints(startDate, id){
  var x = xScale(startDate) - 10,
      y = yScale(id) - (h * 0.00833333),
      coord1 = "" + x + "," + y + " ",
      coord2 = (x + (h * 0.01666667)) + "," + (y - (h * 0.025)) + " ",
      coord3 = (x + (h * 0.03333333)) + "," + (y) + " ",
      coord4 = (x + (h * 0.01666667)) + "," + (y + (h * 0.025)) + ""
  return coord1 + coord2 + coord3 + coord4;
}

function dayMonthYear(date){
  var day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
  return day + "/" + month + "/" + year
}

function textDate(date){
  return date.toDateString()
}

function calcFontSize(){
  if( ((300 < h) && (h < 400)) || (w < 800) ) return h * 0.04;
  if((400 <= h) && (h < 600)) return h * 0.03;
  if(h >= 600) return h * 0.028;
}

var svg = d3.select("body").append("svg")
              .attr("width", w)
              .attr("height", h)
              .style("border", "1px black solid")



var graph = d3.select("svg").append("g")
              .attrs({
                "width": (w / 4) * 3,
                "height": h,
                "x": 0,
                "y": 0,
                transform: "translate(" + (w / 4 ) + ", 0)"
              })
              .styles({
                "border": "1px blue solid"
              })
              .call(d3.zoom().on("zoom", zoom));

              //NOTE: Create tooltip div

//NOTE: TOOL-TIP
var tool = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

var line = graph.selectAll("line")
            .data(dataset)
            .enter()
            .append("line")
            .attrs({
              "stroke": function(d){ return lineColorPicker(d) },
              "stroke-width": "2",
              "x1": function(d, i) { return lineXScale(d, dataset); },
              "y1": function(d, i) { return lineY2Scale(d); },
              "x2": function(d, i) { return lineXScale(d, dataset); },
              "y2": function(d, i) { return scaleYAxis(d.id) - (h * 0.01666667); }
            })

//NOTE: TOOL-TIP
var rect = graph.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect")
              .attrs({
                x: function(d, i) { return scaleXAxisRect(d.startDate); },
                y: function(d, i) { return scaleYAxis(d.id) - (h * 0.05833333); },
                width: function(d) { return scaleRectWidth(d.startDate, d.endDate)},
                height: function(d, i){ return h / 12 },
                fill: function(d, i){ return colorPicker(d)},
                "stroke": function(d, i){ return colorPicker(d)},
                "stroke-width":"3",
                "rx": "3px",
                "ry": "3px"
              }).on("mouseover", function(d) {
                 tool.transition()
                   .duration(500)
                   .style("opacity", .9);
                 tool.html("<strong>Task: </strong>" + d.taskName + "</br>" +
                   "<strong>Start: </strong>" + textDate(d.startDate) + "<br/>"
                          + "<strong>Due: </strong>" + textDate(d.endDate)  + "<br/>")
                   .style("left", ( scaleXAxisRect(d.startDate) + 300 ) + "px")
                   .style("top", (d3.event.pageY) + "px");
                 })
               .on("mouseout", function(d) {
                 div.transition()
                   .duration(500)
                   .style("opacity", 0);
                 });


var milestone = graph.selectAll("diamond")
              .data(dataset)
              .enter()
              .append("polygon")
              .attrs({
                "points": function (d, i){ return calcRhombusPoints(d.startDate, d.id) },
                "fill": function (d){ return diamondFill(d.milestone) },
                "stroke": function (d){ return diamondFill(d.milestone) },
                "stroke-width":"2"
              }).on("mouseover", function(d) {
                 tool.transition()
                   .duration(500)
                   .style("opacity", .9);
                 tool.html("<strong>Milestone </strong><br/>" + textDate(d.startDate))
                   .style("left", ( scaleXAxisRect(d.startDate) + 300 ) + "px")
                   .style("top", (d3.event.pageY) + "px");
                 })
               .on("mouseout", function(d) {
                 div.transition()
                   .duration(500)
                   .style("opacity", 0);
                 });


var line2 = graph.selectAll("line2")
            .data(dataset)
            .enter()
            .append("line")
            .attrs({
              "stroke": "rgb(64, 87, 124)",
              "stroke-width": "2",
              "x1": function(d) { return line2X1Scale(d); },
              "y1": function(d) { return scaleYAxis(d.id) - (h * 0.01666667); },
              "x2": function(d) { return line2X2Scale(d, dataset); },
              "y2": function(d) { return scaleYAxis(d.id) - (h * 0.01666667); }
            })

var arrowhead = graph.selectAll("arrowhead")
            .data(dataset)
            .enter()
            .append("polygon")
            .attrs({
              "points": function(d){
                return "" + (scaleXAxisRect(d.startDate) - (h * 0.03333333)) + "," + (scaleYAxis(d.id) - (h * 0.040)) + " " + scaleXAxisRect(d.startDate) + "," + (scaleYAxis(d.id) - (h * 0.019)) + " " + (scaleXAxisRect(d.startDate) - (h * 0.03333333)) + "," + (scaleYAxis(d.id) + (h * 0.003)) + " " + (scaleXAxisRect(d.startDate) - (h * 0.03233333)) + "," + (scaleYAxis(d.id) -  (h * 0.00333333)) + "" },
              "fill": function (d){ return colorArrowHead(d) },
              "stroke": function (d){ return colorArrowHead(d) },
              "stroke-width":"2"
            })


var yAxisBackground = d3.select("svg").append("rect")
            .attrs({
              "width": (w / 4) * 1,
              "height": h,
              "x": 0,
              "y": 0
            })
            .styles({
              "fill": "white",
              "stroke": "rgb(0, 0, 0)"
            });


var yAxis = d3.select("svg").append("g")
            .attrs({
              "class": "yAxis",
              "width": (w / 4) * 1,
              "height": h,
              "x": 0,
              "y": 0
            })
            .styles({
              "border": "1px blue solid"
          })


xAxis = graph.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisTop(xScale))

xAxis2 = graph.append("g")
      .call(d3.axisBottom(xScale))


function createLabel(d){
  if(d.milestone === true){ return "Milestone " + dayMonthYear(d.startDate) }
  else { return d.taskName /* + " " + dayMonthYear(d.startDate) + " \u2192 " + dayMonthYear(d.endDate) */ }
}

// set up x-axis - text labels //
var taskInfo = yAxis.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) { return createLabel(d) })
    .attrs({
      "text-anchor": "start",
      x: 20,
      y: function(d, i) { return scaleYAxis(d.id) },
      "font-family": "sans-serif",
      "font-size": function() { return calcFontSize() },
      "fill": "black",
      width: w / 4,
      height: 75
    })

function zoom() {
    // re-scale x axis during zoom
   xAxis.transition()
         .duration(0)
         .call(d3.axisTop(xScale).scale(d3.event.transform.rescaleX(xScale)));

  xAxis2.transition()
        .duration(0)
        .call(d3.axisBottom(xScale).scale(d3.event.transform.rescaleX(xScale)));

   // re-draw rectangles using new x and y axis scale
   var new_xScale = d3.event.transform.rescaleX(xScale),
       new_yScale = d3.event.transform.rescaleY(yScale);

   rect
    .attr("x", function(d) { return new_xScale(d.startDate) })
    .attr("width", function(d) { return new_xScale(d.endDate) - new_xScale(d.startDate) });

    line
    .attr("x1", function(d) { return new_xScale((d.startDate, dataset[d.dependentsId - 1].startDate)) })
    .attr("x2", function(d) { return new_xScale((d.startDate, dataset[d.dependentsId - 1].startDate)) });

    line2
     .attr("x1", function(d) { return new_xScale(d.startDate) })
     .attr("x2", function(d) { return new_xScale((d.startDate, dataset[d.dependentsId - 1].startDate)) });

     arrowhead
     .attrs({
       "points": function(d){ return "" + (new_xScale(d.startDate) - (h * 0.03333333)) + "," + (scaleYAxis(d.id) - (h * 0.040)) + " " + new_xScale(d.startDate) + "," + (scaleYAxis(d.id) - (h * 0.019)) + " " + (new_xScale(d.startDate) - (h * 0.03333333)) + "," + (scaleYAxis(d.id) + (h * 0.003)) + " " + (new_xScale(d.startDate) - (h * 0.03233333)) + "," + (scaleYAxis(d.id) - (h * 0.00333333)) + "" }
     })

     milestone
      .attrs({
      "points": function(d){
        var x = new_xScale(d.startDate) - 10,
          y = scaleYAxis(d.id) - (h * 0.00833333),
          coord1 = "" + x + "," + y + " ",
          coord2 = (x + (h * 0.01666667)) + "," + (y - (h * 0.025)) + " ",
          coord3 = (x + (h * 0.03333333)) + "," + (y) + " ",
          coord4 = (x + (h * 0.01666667)) + "," + (y + (h * 0.025)) + ""
        return  coord1 + coord2 + coord3 + coord4
        }
      })
}
