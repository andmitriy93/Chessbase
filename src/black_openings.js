// Openings for Black best 10 ------------------------------------------------------
let defenses = d3.csvParse(
  `Rank,Opening,Win%,Draw%,Points per 100 games
1,Sicilian Defense,34,29,48.5
1,Nimzo Indian,34,29,48.5
3,Robatsch Defense,33,29,47.5
4,Alekhine Defense,32,30,47
5,Nimzowitsch Defense,34,25,46.5
5,Rat,30,33,46.5
7,Benko Gambit,32,28,46
7,Modern Defense,31,30,46
7,Queen's Indian Defense,25,42,46
10,Pseudo King's Indian,29,33,45.5
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


let margin = { top: 20, right: 20, bottom: 30, left: 30 };

let height = 500 - margin.top - margin.bottom
let width = 950 - margin.left - margin.right

// Create svg with class name Chart
let chart = d3.select('.black-open')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let Tip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.rank} Rank</strong><br>${d.win}% Win<br>${d.draw}% Draw`
            })


chart.call(Tip)

let x = d3.scaleBand().domain(defenses.map(d => d.opening)).rangeRound([0, width]).padding(0.2)
let y = d3.scaleLinear().domain([0, 100]).range([height, 0])

// add axis
chart.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).ticks(10))

chart.append('g').attr('class', 'axis y')
    .call(d3.axisLeft(y).ticks(10))

// Text for bar chart
chart.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "end")
    .attr('font-size', 40)
    .text("Black best openings");

let bar = chart.selectAll('.bar')
    .data(defenses)
    .enter()


bar.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) => x(data.opening))
    .attr('y', (data) => y(data.points))
    .attr('height',(data) => height - y(data.points))
    .attr('width', x.bandwidth())
    .on('mouseover', Tip.show)
    .on('mouseout', Tip.hide)


