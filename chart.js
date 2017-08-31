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
    startDate: new Date(2017, 4, 12),
    endDate: new Date(2017, 4, 20),
    milestone: false,
    dependentsId: 2,
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
    startDate: new Date(2017, 11, 1),
    endDate: new Date(2017, 11, 20),
    milestone: false,
    dependentsId: 4,
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
]

//Calculate the spread of the graph
  // calculate min start dates

var minDate = d3.extent(dataset, (d) => { return d.startDate })[0]
var maxDate = d3.extent(dataset, (d) => { return d.endDate })[1]

var maxTaskNumberId = d3.extent(dataset, (d) => { return d.id } )[1]


// create svg and set dimensions
var graphWidth = 900;
var w = 1200;
var h = 600;
var tableLeft = w / 4;

var today = new Date();
var dd = today.getDate();

var year = today.getFullYear();
var month = today.getMonth();
var day = today.getDate();
var c = new Date(year + 1, month, day)
//console.log(c);


//Scale xAxis
var xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, graphWidth])

var yPan = 0; //required?
var yMin = (-h / 2); //required?
var yMAx = (h / 2); //required?

var yScale = d3.scaleLinear()
                .domain([1, 10])
                .range([50, 550])


function scaleXAxisRect(startDate){
  return xScale(startDate)
}

function scaleRectWidth(minDate, maxDate, startDate, endDate){
  return xScale(endDate) - xScale(startDate)
}

function scaleYAxis(taskId){
  return yScale(taskId)
}

function colorPicker(data, index){
    return "rgba(" + (data.dependentsId * 30) + "," + (data.dependentsId * 10) +  ", 60, 1)"
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
                transform: "translate(300, 0)"
              })
              .styles({
                "border": "1px blue solid"
              })
              .call(d3.zoom().on("zoom", zoom));


var rect = graph.selectAll("rect")
              .data(dataset)
              .enter()
              .append("rect")
              .attrs({
                x: function(d, i) { return scaleXAxisRect(d.startDate); },
                y: function(d, i) { return scaleYAxis(d.id) - 35; },
                width: function(d) { return scaleRectWidth(minDate, maxDate, d.startDate, d.endDate)},
                height: function(d, i){ return 50 },
                fill: function(d, i){ return colorPicker(d, i)},
                "stroke":"rgb(64, 87, 124)",
                "stroke-width":"3",
                "rx": "3px",
                "ry": "3px"
              })

var line = graph.selectAll("line")
            .data(dataset)
            .enter()
            .append("line")
            .attrs({
              "stroke": "rgb(64, 87, 124)",
              "stroke-width": "2",
              "x1": function(d, i) { return lineXScale(d, dataset); },
              "y1": function(d, i) { return scaleYAxis(d.id) - 5; },
              "x2": function(d, i) { return lineXScale(d, dataset); },
              "y2": function(d, i) { return lineY2Scale(d); }
            })


var line2 = graph.selectAll("line2")
            .data(dataset)
            .enter()
            .append("line")
            .attrs({
              "stroke": "rgb(64, 87, 124)",
              "stroke-width": "2",
              "x1": function(d, i) { return line2X1Scale(d); },
              "y1": function(d, i) { return scaleYAxis(d.id) - 5; },
              "x2": function(d, i) { return line2X2Scale(d, dataset); },
              "y2": function(d, i) { return scaleYAxis(d.id) - 5; }
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
              "stroke": "rgb(0,0,0)"
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
      .attr("transform", "translate(0, 600)")
      .call(d3.axisTop(xScale))

xAxis2 = graph.append("g")
      .attr("transform", "translate(0, 0)")
      .call(d3.axisBottom(xScale))

// return date as day-month-year

function dayMonthYear(date){
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  return day + "/" + month + "/" + year
}

// set up x-axis - text labels //
var taskInfo = yAxis.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) { return d.taskName + " " + dayMonthYear(d.startDate) + " - " + dayMonthYear(d.endDate) })
    .attrs({
      "text-anchor": "start",
      x: 20,
      y: function(d, i) { return scaleYAxis(d.id) },
      "font-family": "sans-serif",
      "font-size": 16,
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
   var new_xScale = d3.event.transform.rescaleX(xScale);
   var new_yScale = d3.event.transform.rescaleY(yScale);

   rect
    .attr("x", function(d) { return new_xScale(d.startDate) })
    //.attr("y", function(d) { return new_yScale(d.id) - 35})
    .attr("width", function(d) { return new_xScale(d.endDate) - new_xScale(d.startDate) })

//   taskInfo
//     .attr("y", function(d) { return new_yScale(d.id) })
}

/* User Registration */

function registerNewUser(e){
  var form = e.target.elements
  e.preventDefault(e)
  var newTask = {
      taskName: form.taskName,
      startDate: form.startDate,
      endDate: form.endDate,
      milestone: form.mileStone,
      dependentsId: form.dependents // consider DB relationships and how these might split up into seperate tables.
  }
//  addNewTask(newTask)
}


// if dependents.length = 0
// 	then choose a hex colour
// else if(dependents.length > 0)
// 	then use first hex number from dependent id
//
//
// also arrange tasks by start finish dates
