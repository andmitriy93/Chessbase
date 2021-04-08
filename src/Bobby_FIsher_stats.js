let bobbyFisher = d3.csvParse(
  `Title,Results%,Percents
  Total Win,680,57
  Total Draw,346,29
  Total Lose,167,14
  White Win,440,61
  White Draw,173,24
  White Lose,108,15
  Black Win,236,50
  Black Draw,173,37
  Black Lose,61,13
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let margin5 = { top: 20, right: 20, bottom: 30, left: 40 };

let height5 = 500 - margin5.top - margin5.bottom;
let width5 = 900 - margin5.left - margin5.right;

// Create svg with class name Chart
let bobby = d3.select('.fisher-stats')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let bobbyTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


bobby.call(bobbyTip)


let x6 = d3.scaleBand().domain(bobbyFisher.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let y6 = d3.scaleLinear().domain([0, 1193]).range([height5, 0])

// add axis
bobby.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(x6).ticks(10))

bobby.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(y6).ticks(10))

// Text for bar chart
bobby.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .text("Bobby Fisher Stats");

let barBobby = bobby.selectAll('.bar')
    .data(bobbyFisher)
    .enter()


barBobby.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + x6(data.title))
    .attr('y', (data) => y6(data.value))
    .attr('height',(data) => height5 - y6(data.value))
    .attr('width', x6.bandwidth())
    .on('mouseover', bobbyTip.show)
    .on('mouseout', bobbyTip.hide)