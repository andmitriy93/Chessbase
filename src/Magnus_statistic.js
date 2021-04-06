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

var data = [
  // {symbol: 'w', date: 'Dec 2013', value: 3},
  // {symbol: 'w', date: 'Aug 2014', value: 18},
  // {symbol: 'w', date: 'Apr 2015', value: 28},
  // {symbol: 'w', date: 'Dec 2015', value: 40},
  // {symbol: 'w', date: 'Aug 2016', value: 60},
  // {symbol: 'w', date: 'Apr 2017', value: 71},
  // {symbol: 'w', date: 'Dec 2017', value: 87},
  // {symbol: 'w', date: 'Aug 2018', value: 104},
  // {symbol: 'w', date: 'Apr 2019', value: 110},
  // {symbol: 'w', date: 'Dec 2019', value: 136},
  // {symbol: 'w', date: 'Aug 2020', value: 141},
  // {symbol: 'w', date: 'Apr 2021', value: 149},
  // {symbol: 'l', date: 'Dec 2013', value: 0},
  // {symbol: 'l', date: 'Aug 2014', value: 5},
  // {symbol: 'l', date: 'Apr 2015', value: 8},
  // {symbol: 'l', date: 'Dec 2015', value: 16},
  // {symbol: 'l', date: 'Aug 2016', value: 18},
  // {symbol: 'l', date: 'Apr 2017', value: 20},
  // {symbol: 'l', date: 'Dec 2017', value: 25},
  // {symbol: 'l', date: 'Aug 2018', value: 27},
  // {symbol: 'l', date: 'Apr 2019', value: 27},
  // {symbol: 'l', date: 'Dec 2019', value: 27},
  // {symbol: 'l', date: 'Aug 2020', value: 27},
  // {symbol: 'l', date: 'Apr 2021', value: 27},
  // {symbol: 'd', date: 'Dec 2013', value: 0},
  // {symbol: 'd', date: 'Aug 2014', value: 17},
  // {symbol: 'd', date: 'Apr 2015', value: 37},
  // {symbol: 'd', date: 'Dec 2015', value: 47},
  // {symbol: 'd', date: 'Aug 2016', value: 75},
  // {symbol: 'd', date: 'Apr 2017', value: 98},
  // {symbol: 'd', date: 'Dec 2017', value: 119},
  // {symbol: 'd', date: 'Aug 2018', value: 157},
  // {symbol: 'd', date: 'Apr 2019', value: 190},
  // {symbol: 'd', date: 'Dec 2019', value: 225},
  // {symbol: 'd', date: 'Aug 2020', value: 238},
  // {symbol: 'd', date: 'Apr 2021', value: 250}

  // {symbol: 'w', date: 'Dec 2013', value: 3},
  // {symbol: 'w', date: 'Aug 2014', value: 18},
  { symbol: "w", date: 2015, value: 28 },
  { symbol: "w", date: 2015, value: 40 },
  { symbol: "w", date: 2016, value: 60 },
  { symbol: "w", date: 2017, value: 71 },
  { symbol: "w", date: 2017, value: 87 },
  { symbol: "w", date: 2018, value: 104 },
  { symbol: "w", date: 2019, value: 110 },
  { symbol: "w", date: 2019, value: 136 },
  { symbol: "w", date: 2020, value: 141 },
  { symbol: "w", date: 2021, value: 149 },
  { symbol: "l", date: 2013, value: 0 },
  { symbol: "l", date: 2014, value: 5 },
  { symbol: "l", date: 2015, value: 8 },
  { symbol: "l", date: 2015, value: 16 },
  { symbol: "l", date: 2016, value: 18 },
  { symbol: "l", date: 2017, value: 20 },
  { symbol: "l", date: 2017, value: 25 },
  { symbol: "l", date: 2018, value: 27 },
  { symbol: "l", date: 2019, value: 27 },
  { symbol: "l", date: 2019, value: 27 },
  { symbol: "l", date: 2020, value: 27 },
  { symbol: "l", date: 2021, value: 27 },
  { symbol: "d", date: 2013, value: 0 },
  { symbol: "d", date: 2014, value: 17 },
  { symbol: "d", date: 2015, value: 37 },
  { symbol: "d", date: 2015, value: 47 },
  { symbol: "d", date: 2016, value: 75 },
  { symbol: "d", date: 2017, value: 98 },
  { symbol: "d", date: 2017, value: 119 },
  { symbol: "d", date: 2018, value: 157 },
  { symbol: "d", date: 2019, value: 190 },
  { symbol: "d", date: 2019, value: 225 },
  { symbol: "d", date: 2020, value: 238 },
  { symbol: "d", date: 2021, value: 250 },
];

let margin4 = { top: 20, right: 20, bottom: 30, left: 30 };

let height4 = 500 - margin4.top - margin4.bottom;
let width4 = 1000 - margin4.left - margin4.right;

let parseTime = d3.timeParse("%Y");

data.forEach(function (d) {
  d.date = parseTime(d.date);
});

let graph = d3
  .select(".magnus-stats")
  // .attr("height", height4 + margin4.top + margin4.bottom)
  // .attr('width', width4 + margin4.left + margin4.right)
  .append("g")
  .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

//scale xAxis
let xExtent = d3.extent(data, (d) => d.date);
xScale = d3.scaleTime().domain(xExtent).range([margin4.left, 900]);

//scale yAxis
let yMax = d3.max(data, (d) => d.value);
yScale = d3
  .scaleLinear()
  .domain([0, yMax + 20])
  .range([500, 0]); // 20 - its margin.top

//draw xAxis and xAxis label
xAxis = d3.axisBottom().scale(xScale);

graph
  .append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0, 520)")
  .call(xAxis)
  .append("text")
  .attr("x", (900 + 70) / 2) // middle of the xAxis
  .attr("y", 50) // a little bit below xAxis
  .attr('fill', 'black')
  .attr('font-size', '18')
  .text("Year");

//yAxis and yAxis label
yAxis = d3.axisLeft().scale(yScale).ticks(10);

graph
  .append("g")
  .attr("class", "axis")
  .attr("transform", `translate(${margin4.left}, 20)`)
  .call(yAxis)
  .append("text")
  .attr('transform', 'rotate(-90)')
  .attr("x", -150)
  .attr("y", -40)
  .attr("text-anchor", "end")
  .attr("font-size", '18')
  .attr('fill', 'black')
  .text("Games");

















// // Parse the date / time
// let parseDate = d3.timeFormat("%b %Y").parse;

// // Set the ranges
// let x4 = d3.scaleTime().range([0, width4]);
// let y4 = d3.scaleLinear().range([height4, 0]);

// // Define the axis
// let xAxis = d3.axisBottom(x4).ticks(10);

// let yAxis = d3.axisLeft(y4).ticks(10);

// // Define the line
// let scoreLine = d3.line()
//   .x4(function (d) {
//     return x4(d.date);
//   })
//   .y4(function (d) {
//     return y(d.value);
//   });

// // Adds the svg canvas
// const svg4 = d3
//   .select(".line-chart")
//   .append("svg")
//   .attr("height", height4 + margin4.top + margin4.bottom)
//   .attr("width", width4 + margin4.left + margin4.right)
//   .append("g")
//   .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

// // Get the data
// d3.csv('Magnus_Carlsen.csv', function(error, data) {
//   data.forEach(function(d) {
//     d.date = parseDate(d.date);
//     d.value = +d.value
//   })

//   //Scale the range of the data
//   x4.domain(d3.extent(data, function(d) { return d.date}));
//   y4.domain([0, d3.max(data, function(d) { return d.value})]);

//   // Nest the entries by symbol
//   let dataNest = d3.nest()
//     .key(function(d) {return d.symbol})
//     .entries(data);

//   // Set the color scale
//   let color = d3.scale.category10()

//   // Loop through each symbol / key
//   dataNest.forEach(function(d) {
//     svg4.append('path')
//       .attr('class', 'line')
//       .style('stroke', function() {
//         return d.color = color(d.key)
//       })
//       .attr('d', scoreLine(d.values));
//   })

//   // Add the X Axis
//   svg4.append('g')
//     .attr('class', 'x axis')
//     .attr('transform', 'translate(0,' + height + ')')
//     .call(xAxis)

//   // Add the Y Axis
//   svg4.append('g')
//     .attr('class', 'y axis')
//     .call(yAxis)

// })
