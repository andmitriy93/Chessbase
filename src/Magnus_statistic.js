// date,win,lose,draw
// 2013-12,3,0,0
// 2014-08,18,5,17
// 2015-04,28,8,37
// 2015-12,40,16,47
// 2016-08,60,18,75
// 2017-04,71,20,98
// 2017-12,87,25,119
// 2018-08,104,27,157
// 2019-04,110,27,190
// 2019-12,136,27,225
// 2020-08,141,27,238
// 2021-04,149,30,250

// const { svg } = require("d3-fetch");

let margin4 = { top: 20, right: 20, bottom: 30, left: 30 };

let height4 = 500 - margin4.top - margin4.bottom;
let width4 = 1000 - margin4.left - margin4.right;

// Parse the date / time
let parseDate = d3.time.format("%b %Y").parse;

// Set the ranges
let x4 = d3.time.scale().range([0, width4]);
let y4 = d3.scale.linear().range([heigh4, 0]);

// Define the axes
let xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(10);

let yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

// Define the line
let scoreLine = d3.svg
  .line()
  .x4(function (d) {
    return x4(d.date);
  })
  .y4(function (d) {
    return y(d.value);
  });

// Adds the svg canvas
const svg4 = d3
  .select(".line-chart")
  .append("svg")
  .attr("height", height4 + margin4.top + margin4.bottom)
  .attr("width", width4 + margin4.left + margin4.right)
  .append("g")
  .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");


// Get the data
d3.csv('Magnus_Carlsen.csv', function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.value = +d.value
  })

  //Scale the range of the data
  x4.domain(d3.extent(data, function(d) { return d.date}));
  y4.domain([0, d3.max(data, function(d) { return d.value})]);

  // Nest the entries by symbol
  let dataNest = d3.nest()
    .key(function(d) {return d.symbol})
    .entries(data);
  
  // Set the color scale
  let color = d3.scale.category10()

  // Loop through each symbol / key
  dataNest.forEach(function(d) {
    svg4.append('path')
      .attr('class', 'line')
      .style('stroke', function() {
        return d.color = color(d.key)
      })
      .attr('d', scoreLine(d.values));
  })


  // Add the X Axis
  svg4.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  // Add the Y Axis
  svg4.append('g')
    .attr('class', 'y axis')
    .call(yAxis)




})