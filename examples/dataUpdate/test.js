var data = [{
  name: 'foo',
  value: 2000
}, {
  name: 'bar',
  value: 4000
}, {
  name: 'baz',
  value: 1500
}];

var svg = d3.select("svg");

var scale = d3.scaleLinear()
  .domain([0, 5000])
  .range([0, 500]);

var bars = svg.selectAll(null)
  .data(data)
  .enter()
  .append("rect")
  .attr("y", function(d, i) {
    return 10 + i * 30
  })
  .attr("height", 20)
  .attr("width", function(d) {
    return scale(d.value)
  })
  .style("fill", "#666")
  .call(d3.drag().on("drag", function(d) {
    d.value = scale.invert(d3.mouse(this)[0])
    d3.select(this).attr("width", scale(d.value))
    console.log("datum: " + JSON.stringify(d))
  }))
