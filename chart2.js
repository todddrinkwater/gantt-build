dataset =  [
  { taskGroupId: 1, taskGoal: "Complete Something", tasks: [
    { taskId: 1, taskName: "Task 1", startDate: new Date(2017, 0, 1), endDate: new Date(2017, 5, 1), milestone: false,  status: "Complete" },
    { taskId: 2, taskName: "Task 2", startDate: new Date(2017, 1, 12), endDate: new Date(2017, 2, 3), milestone: false, status: "In Progress" },
    { taskId: 3, taskName: "Task 3", startDate: new Date(2017, 4, 12), endDate: new Date(2017, 4, 20), milestone: false, status: "In Progress" }
  ]},
  { taskGroupId: 2, taskGoal: "Complete Something Else", tasks: [
    { taskId: 1, taskName: "Task 4", startDate: new Date(2017, 5, 11), endDate: new Date(2017, 11, 27), milestone: false, status: "In Progress" },
    { taskId: 2, taskName: "Task 5", startDate: new Date(2018, 5, 11), endDate: new Date(2018, 11, 27), milestone: false, status: "In Progress" },
    { taskId: 3, taskName: "Task 6", startDate: new Date(2017, 11, 1), endDate: new Date(2017, 11, 20), milestone: false, status: "Complete" }
  ]},
  { taskGroupId: 3, taskGoal: "Complete Another", tasks: [
    { taskId: 1, taskName: "Task 7", startDate: new Date(2018, 0, 1), endDate: new Date(2018, 2, 3), milestone: false, status: "In Progress" },
    { taskId: 2, taskName: "Task 9", startDate: new Date(2018, 3, 01), endDate: new Date(2018, 4, 27), milestone: false, status: "In Progress" },
    { taskId: 3, taskName: "Task 10", startDate: new Date(2018, 3, 11), endDate: new Date(2018, 5, 27), milestone: false, status: "In Progress" }
  ]}
]

//working with dataset

// dataset.map((data) => {
// 	console.log(data.taskGroupId, data.taskGoal)
// 	data.tasks.map((task) => {
// 		console.log(task.taskName)
//   })
// })

function processDates(dates, startOrEndDate){
  console.log(dates);
  var dateArr = []
  dates.map( (entry) => {
    if(startorEndDate = "start"){
      entry.tasks.map((task) => { dateArr.push(task.startDate); })
    }
    else {
      entry.tasks.map((task) => { dateArr.push(task.endDate); })
    }
  })
  return dateArr
}

//Calculate the spread of the graph
  // calculate min start dates

var getStartDates = processDates(dataset, "start");
var getEndDates = processDates(dataset, "end")

var minDate = d3.extent(getStartDates, (d) => { return d })[0]
var maxDate = d3.extent(getEndDates, (d) => { return d })[1]


console.log(minDate);
console.log(maxDate);
// var maxTaskNumberId = d3.extent(dataset, (d) => { return d.id } )[1]
//
//
// // create svg and set dimensions
// var graphWidth = 900;
// var w = 1200;
// var h = 600;
// var tableLeft = w / 4;
//
// var today = new Date();
// var dd = today.getDate();
//
// var year = today.getFullYear();
// var month = today.getMonth();
// var day = today.getDate();
// var c = new Date(year + 1, month, day)
// //console.log(c);
//
//
// //Scale xAxis
// var xScale = d3.scaleTime()
//                 .domain([minDate, maxDate])
//                 .range([0, graphWidth])
//
// var yPan = 0;
// var yMin = (-h / 2);
// var yMAx = (h / 2);
//
// var yScale = d3.scaleLinear()
//                 .domain([1, 10])
//                 .range([50, 550])
//
//
// function scaleXAxisRect(startDate){
//   return xScale(startDate)
// }
//
// function scaleRectWidth(minDate, maxDate, startDate, endDate){
//   return xScale(endDate) - xScale(startDate)
// }
//
// function scaleYAxis(taskId){
//   return yScale(taskId)
// }
//
// var svg = d3.select("body").append("svg")
//               .attr("width", w)
//               .attr("height", h)
//               .style("border", "1px black solid")
//
//
// var graph = d3.select("svg").append("g")
//               .attrs({
//                 "width": (w / 4) * 3,
//                 "height": h,
//                 "x": 0,
//                 "y": 0,
//                 transform: "translate(300, 0)"
//               })
//               .styles({
//                 "border": "1px blue solid"
//               })
//               .call(d3.zoom().on("zoom", zoom));
//
//
// var rect = graph.selectAll("rect")
//               .data(dataset)
//               .enter()
//               .append("rect")
//               .attrs({
//                 x: function(d, i) { return scaleXAxisRect(d.startDate); },
//                 y: function(d, i) { return scaleYAxis(d.id) - 35; },
//                 width: function(d) { return scaleRectWidth(minDate, maxDate, d.startDate, d.endDate)},
//                 height: function(d, i){ return 50 },
//                 fill: "rgb(124, 144, 175)",
//                 "stroke":"rgb(64, 87, 124)",
//                 "stroke-width":"5",
//                 "rx": "20px",
//                 "ry": "20px"
//               })
//               .styles({
//                 "border-radius": "20px"
//               })
//
//
//
// var yAxisBackground = d3.select("svg").append("rect")
//             .attrs({
//               "width": (w / 4) * 1,
//               "height": h,
//               "x": 0,
//               "y": 0
//             })
//             .styles({
//               "fill": "white",
//               "stroke": "rgb(0,0,0)"
//             });
//
//
// var yAxis = d3.select("svg").append("g")
//             .attrs({
//               "class": "yAxis",
//               "width": (w / 4) * 1,
//               "height": h,
//               "x": 0,
//               "y": 0
//             })
//             .styles({
//               "border": "1px blue solid"
//           })
//
//
// xAxis = graph.append("g")
//       .attr("transform", "translate(0, 600)")
//       .call(d3.axisTop(xScale))
//
// // return date as day-month-year
//
// function dayMonthYear(date){
//   var day = date.getDate()
//   var month = date.getMonth() + 1
//   var year = date.getFullYear()
//   return day + "/" + month + "/" + year
// }
//
// // set up x-axis - text labels //
// var taskInfo = yAxis.selectAll("text")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .text(function(d) { return d.taskName + " " + dayMonthYear(d.startDate) + " - " + dayMonthYear(d.endDate) })
//     .attrs({
//       "text-anchor": "start",
//       x: 20,
//       y: function(d, i) { return scaleYAxis(d.id) },
//       "font-family": "sans-serif",
//       "font-size": 16,
//       "fill": "black",
//       width: w / 4,
//       height: 75
//     })
//
// function zoom() {
//     // re-scale x axis during zoom
//    xAxis.transition()
//          .duration(0)
//          .call(d3.axisTop(xScale).scale(d3.event.transform.rescaleX(xScale)));
//
//
//    // re-draw rectangles using new x and y axis scale
//    var new_xScale = d3.event.transform.rescaleX(xScale);
//    var new_yScale = d3.event.transform.rescaleY(yScale);
//
//    rect
//     .attr("x", function(d) { return new_xScale(d.startDate) })
//     //.attr("y", function(d) { return new_yScale(d.id) - 35})
//     .attr("width", function(d) { return new_xScale(d.endDate) - new_xScale(d.startDate) })
//
// //   taskInfo
// //     .attr("y", function(d) { return new_yScale(d.id) })
// }
//
// /* User Registration */
//
// function registerNewUser(e){
//   var form = e.target.elements
//   e.preventDefault(e)
//   var newTask = {
//       taskName: form.taskName,
//       startDate: form.startDate,
//       endDate: form.endDate,
//       milestone: form.mileStone,
//       dependentsId: form.dependents // consider DB relationships and how these might split up into seperate tables.
//   }
// //  addNewTask(newTask)
// }
