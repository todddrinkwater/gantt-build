var dataset =  [
  {
    id: 1,
    taskName: "Task 1",
    startDate: new Date(2017, 0, 1),
    endDate: new Date(2017, 5, 1),
    milestone: false,
    dependentsId: [], // consider DB relationships and how these might split up into seperate tables.
    status: "Complete"
  },
  {
    id: 2,
    taskName: "Task 2",
    startDate: new Date(2017, 1, 12),
    endDate: new Date(2017, 2, 3),
    milestone: false,
    dependentsId: [1],
    status: "In Progress"
  },
  {
    id: 3,
    taskName: "Task 3",
    startDate: new Date(2017, 4, 12),
    endDate: new Date(2017, 4, 20),
    milestone: false,
    dependentsId: [1, 2],
    status: "In Progress"
  },
  {
    id: 4,
    taskName: "Task 4",
    startDate: new Date(2017, 5, 11),
    endDate: new Date(2017, 11, 27),
    milestone: false,
    dependentsId: [1, 2],
    status: "In Progress"
  }
]

//Calculate the spread of the graph
  // calculate min start dates

  start = []

  dataset.forEach( data => {
  	start.push(data.startDate)
  } )

  var minDate = new Date(Math.min.apply(null,start));


// calculate max end dates

  end = []

  dataset.forEach( data => {
    end.push(data.endDate)
  } )

  var maxDate = new Date(Math.max.apply(null, end));
  console.log(maxDate, "maxDate")


// create svg and set dimensions
var graphWidth = 900;
var w = 1200;
var h = 600;
var tableLeft = w / 4;

function scaleXAxisRect(minDate, maxDate, startDate){
  var xScale = d3.scaleTime()
                  .domain([minDate, maxDate])
                  .range([0, graphWidth])

  return xScale(startDate)
}

function scaleRectWidth(minDate, maxDate, startDate, endDate){
  var xScale = d3.scaleTime()
                  .domain([minDate, maxDate])
                  .range([0, graphWidth])

  return xScale(endDate) - xScale(startDate)
}

var xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, graphWidth])

var svg = d3.select("body").append("svg")
              .attr("width", w)
              .attr("height", h)
              .style("border", "1px black solid");

var yAxis = d3.select("svg").append("g")
              .attrs({
                "width": (w / 4) * 1,
                "height": h,
                "x": 0,
                "y": 0
              }).styles({"border": "1px blue solid"});

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


graph.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attrs({
    x: function(d, i) { return scaleXAxisRect(minDate, maxDate, d.startDate); },
    y: function(d, i) { return (h / dataset.length) * i; },
    width: function(d) { return scaleRectWidth(minDate, maxDate, d.startDate, d.endDate)},
    height: function(d, i){ return h / dataset.length },
    fill: "blue"
  });


// var view = [1, 2, 3, 4, 5, 6, 7]


// graph.selectAll("line")
//   .data(view)
//   .enter()
//   .append("line")
//   .attrs({
//     "x1": function(d, i){ return (i / 7) * graphWidth },
//     "y1": 0,
//     "x2": function(d, i){ return (i / 7) * graphWidth },
//     "y2": h,
//     width: "1px",
//     height: h,
//   })
//   .styles({
//     "stroke-width": 2,
//     "stroke": "red",
//     "fill": "none"
//   });


svg.append("g")
      .attr("transform", "translate(" + tableLeft + ", 600)")
      .call(d3.axisTop(xScale))

// return date as day-month-year

function dayMonthYear(date){
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  return day + "/" + month + "/" + year
}




// set up x-axis - text labels //

yAxis.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) { return d.taskName + " " + dayMonthYear(d.startDate) + " - " + dayMonthYear(d.endDate) })
  .attrs({
    "text-anchor": "start",
    x: 0,
    y: function(d, i) { return i * ( h / dataset.length ) + 10 },
    "font-family": "sans-serif",
    "font-size": 12,
    "fill": "black"
  })
