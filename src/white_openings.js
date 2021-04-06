// Openings for White best 10
let openings = d3.csvParse(
  `Rank,Opening,Win%,Draw%,Points per 100 games
1,Queen's Gambit,40,36,58
2,Blackmar Diemer Gambit,49,16,57
3,Ruy Lopez,40,33,56.5
4,Bishop's Opening,41,30,56
5,Benko Opening,38,35,55.5
5,Reti Opening,37,37,55.5
5,Vienna Game,41,29,55.5
8,Centre Game,44,22,55
8,English Opening,38,34,55
8,Scotch Game,40,30,55
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

let margin1 = { top: 20, right: 20, bottom: 30, left: 30 };

let height1 = 500 - margin1.top - margin1.bottom
let width1 = 1000 - margin1.left - margin1.right

// Create svg with class name Chart
let chart1 = d3.select('.white-open')
    .attr("height", height1 + margin1.top + margin1.bottom)
    .attr('width', width1 + margin1.left + margin1.right)
    .append('g')
    .attr('transform', 'translate(' + margin1.left + ',' + margin1.top + ')')

// Create tooltip
let Tip1 = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.rank} Rank</strong><br>${d.win}% Win<br>${d.draw}% Draw`
            })


chart1.call(Tip1)

let x1 = d3.scaleBand().domain(openings.map(d => d.opening)).rangeRound([0, width1]).padding(0.2)
let y1 = d3.scaleLinear().domain([0, 100]).range([height1, 0])

// add axis
chart1.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(0,' + height1 + ')')
    .call(d3.axisBottom(x1).ticks(10))

chart1.append('g').attr('class', 'axis y')
    .call(d3.axisLeft(y1).ticks(10))

// Text for bar chart
chart1.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "end")
    .attr('font-size', 40)
    .text("White best openings");

let bar1 = chart1.selectAll('.bar')
    .data(openings)
    .enter()


bar1.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) => x1(data.opening))
    .attr('y', (data) => y1(data.points))
    .attr('height',(data) => height1 - y1(data.points))
    .attr('width', x1.bandwidth())
    .on('mouseover', Tip1.show)
    .on('mouseout', Tip1.hide)

