var dataset =  [
  {
    id: 1,
    taskName: "Task 1",
    startTime: "01/01/16",
    endTime: "10/01/16",
    milestone: false,
    dependents: [],
    status: "Complete"
  },
  {
    id: 2,
    taskName: "Task 2",
    startTime: "10/01/16",
    endTime: "20/01/16",
    milestone: false,
    dependents: [1],
    status: "In Progress"
  },
  {
    id: 3,
    taskName: "Task 3",
    startTime: "21/01/16",
    endTime: "29/01/16",
    milestone: false,
    dependents: [1, 2],
    status: "In Progress"
  }
]

// create function to map out a table
function sortTable(info){
  info.map((dataEntry) => { // map through every element in the info array
    for (var prop in dataEntry) { // for each property in the object return a row containing the object data
      console.log(dataEntry[prop]);
  }
  })
}

// create svg and set dimensions
var graphWidth = 900;
var w = 1200;
var h = 600;
var padding = 2;


var svg = d3.select("body").append("svg")
              .attr("width", w)
              .attr("height", h)
              .style("border", "1px black solid");

var xAxis = d3.select("svg").append("g")
              .attr({
                "width": (w / 4) * 1,
                "height": h,
                "x": 0,
                "y": 0
              })
              .style({
                "border": "1px blue solid"
              })

var graph = d3.select("svg").append("g")
              .attr({
                "width": (w / 4) * 3,
                "height": h,
                "x": 0,
                "y": 0,
                transform: "translate(300, 0)"
              })
              .style({
                "border": "1px blue solid"
              })

// create a rectangle for every task
// set it to somewhere on the axis

graph.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr({
    x: function(d, i) { return i * (graphWidth / dataset.length); },
    y: function(d, i) { return (h / dataset.length) * i; },
    width: "200px",
    height: function(d, i){ return h / dataset.length},
    fill: "blue"
  });

//calculate chart layout for a year

// function setYear(year){
  // user inputs year they wish to view
  // year is input into new Date()
  // year is scaled out amongst graph
  // 12 lines must be scaled according to dates/year/month size.
  // data must also be scaled accordingly.

// }
//caclulate chart layout for one month
//calculate chart layout for one week

var view = [1, 2, 3, 4, 5, 6, 7]

// function setView(view){
//   switch(view){
//     case "day":
//       return
//   }
// }

graph.selectAll("line")
  .data(view)
  .enter()
  .append("line")
  .attr({
    "x1": function(d, i){ return (i / 7) * graphWidth },
    "y1": 0,
    "x2": function(d, i){ return (i / 7) * graphWidth },
    "y2": h,
    width: "1px",
    height: h,
  })
  .style({
    "stroke-width": 2,
    "stroke": "red",
    "fill": "none"
  });

// set up x-axis - text labels

xAxis.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) { return d.taskName + " " + d.startTime + " " + d.endTime; })
  .attr({
    "text-anchor": "start",
    x: 0,
    y: function(d, i) { return i * ( h / dataset.length ) + 10 },
    "font-family": "sans-serif",
    "font-size": 12,
    "fill": "black"
  })
