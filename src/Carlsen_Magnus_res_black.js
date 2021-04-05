let datasetBlack = [
  { name: "Win", value: 250 },
  { name: "Lose", value: 85 },
  { name: "Draw", value: 419 },
];

// let width = 500;
// let height = 500;
let radius1 = Math.min(width, height) / 2;
let donutWidth1 = 75;
let color1 = d3
  .scaleOrdinal()
  .range(["#88cefa", "#fa8073", "#d3d3d3", "#08B2B2"]);

let svg1 = d3
  .select(".donut-black")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

let arc1 = d3
  .arc()
  .innerRadius(radius1 - donutWidth1)
  .outerRadius(radius1);

let pie1 = d3
  .pie()
  .value(function (d) {
    return d.value;
  })
  .sort(null);

let path1 = svg1
  .selectAll("path")
  .data(pie1(datasetBlack))
  .enter()
  .append("path")
  .attr("d", arc1)
  .attr("fill", function (d, i) {
    return color1(d.data.name + ': ' + d.data.value);
  })
  .attr("transform", "translate(0, 0)");




let legendRectSize1 = 13;
let legendSpacing1 = 7;
let legend1 = svg1
  .selectAll(".legend") //the legend and placement
  .data(color1.domain())
  .enter()
  .append("g")
  .attr("class", "circle-legend")
  .attr("transform", function (d, i) {
    let height = legendRectSize1 + legendSpacing1;
    let offset = (height * color1.domain().length) / 2;
    let horz = -2 * legendRectSize1 - 13;
    let vert = i * height - offset;
    return "translate(" + horz + "," + vert + ")";
  });
legend1
  .append("circle") //keys
  .style("fill", color1)
  .style("stroke", color1)
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", ".5rem");
legend1
  .append("text") //labels
  .attr("x", legendRectSize1 + legendSpacing1)
  .attr("y", legendRectSize1 - legendSpacing1)
  .text(function (d) {
    return d;
  });





// svg1.append('text')
//   .attr('y', 210)
//   .attr('x', -118)
//   .attr('text-anchor', 'end')
//   .attr('font-size', 30)
//   .attr('fill', 'rgb(101, 186, 170)')
//   .text('Carlsen Magnus black pieces')
