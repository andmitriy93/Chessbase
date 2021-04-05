let dataset = [
  { name: "Win", value: 384 },
  { name: "Lose", value: 78 },
  { name: "Draw", value: 303 },
];

// let width = 500;
// let height = 500;
let radius = Math.min(width, height) / 2;
let donutWidth = 75;
let color = d3
  .scaleOrdinal()
  .range(["#88cefa", "#fa8073", "#d3d3d3", "#08B2B2"]);

let svg = d3
  .select(".donut")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

let arc = d3
  .arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

let pie = d3
  .pie()
  .value(function (d) {
    return d.value;
  })
  .sort(null);

let path = svg
  .selectAll("path")
  .data(pie(dataset))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", function (d, i) {
    return color(d.data.name + ": " + d.data.value);
  })
  .attr("transform", "translate(0, 0)");

let legendRectSize = 13;
let legendSpacing = 7;
let legend = svg
  .selectAll(".legend") //the legend and placement
  .data(color.domain())
  .enter()
  .append("g")
  .attr("class", "circle-legend")
  .attr("transform", function (d, i) {
    let height = legendRectSize + legendSpacing;
    let offset = (height * color.domain().length) / 2;
    let horz = -2 * legendRectSize - 13;
    let vert = i * height - offset;
    return "translate(" + horz + "," + vert + ")";
  });
legend
  .append("circle") //keys
  .style("fill", color)
  .style("stroke", color)
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", ".5rem");
legend
  .append("text") //labels
  .attr("x", legendRectSize + legendSpacing)
  .attr("y", legendRectSize - legendSpacing)
  .text(function (d) {
    return d;
  });

svg
  .append("text")
  .attr("y", 210)
  .attr("x", -118)
  .attr("text-anchor", "end")
  .attr("font-size", 30)
  .attr('fill', 'rgb(101, 186, 170)')
  .text("Carlsen Magnus white pieces");
