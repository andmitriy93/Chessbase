// Openings for White best 10
let white_worst = d3.csvParse(
  `Rank,Opening,Win%,Draw%,Points per 100 games
1,Van't Kruijs Attack,28,25,40.4
2,Anderssen's Opening,30,27,43.5
3,Grob Opening,36,18,45
4,Saragossa Opening,34,23,45.5
5,Bird's Opening,34,25,46.5
6,Polish Defense,38,23,49.5
7,Dunst Opening,36,28,50
7,Anti-Veresov Opening,36,28,50
9,Colle System,35,31,50.5
10,Mieses Opening,39,24,51
`,
  function (d) {
    return {
      rank: +d["Rank"],
      opening: d.Opening,
      win: +d["Win%"],
      draw: +d["Draw%"],
      points: +d["Points per 100 games"],
    };
  }
);

let margin2 = { top: 20, right: 20, bottom: 30, left: 30 };

let height2 = 500 - margin2.top - margin2.bottom
let width2 = 1000 - margin2.left - margin2.right

// Create svg with class name Chart
let chart2 = d3.select('.white-worst')
    .attr("height", height2 + margin2.top + margin2.bottom)
    .attr('width', width2 + margin2.left + margin2.right)
    .append('g')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

// Create tooltip
let Tip2 = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.rank} Rank</strong><br>${d.win}% Win<br>${d.draw}% Draw`
            })


chart2.call(Tip2)

let x2 = d3.scaleBand().domain(white_worst.map(d => d.opening)).rangeRound([0, width2]).padding(0.2)
let y2 = d3.scaleLinear().domain([0, 100]).range([height2, 0])

// add axis
chart2.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(0,' + height2 + ')')
    .call(d3.axisBottom(x2).ticks(10))

chart2.append('g').attr('class', 'axis y')
    .call(d3.axisLeft(y2).ticks(10))

// Text for bar chart
chart2.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "end")
    .attr('font-size', 40)
    .text("White worst openings");

let bar2 = chart2.selectAll('.bar')
    .data(white_worst)
    .enter()


bar2.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) => x2(data.opening))
    .attr('y', (data) => y2(data.points))
    .attr('height',(data) => height2 - y2(data.points))
    .attr('width', x2.bandwidth())
    .on('mouseover', Tip2.show)
    .on('mouseout', Tip2.hide)
