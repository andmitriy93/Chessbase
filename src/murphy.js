let murphyData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,290,77
  Total Draw,45,12
  Total Lose,41,11
  White Win,197,81
  White Draw,24,10
  White Lose,22,9
  Black Win,92,69
  Black Draw,21,16
  Black Lose,20,15
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginMurphy = { top: 20, right: 20, bottom: 30, left: 40 };

let heightMurphy = 500 - marginMurphy.top - marginMurphy.bottom;
let widthMurphy = 900 - marginMurphy.left - marginMurphy.right;

// Create svg with class name Chart
let murphy = d3.select('.murphy')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let murphyTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


murphy.call(murphyTip)


let xMurphy = d3.scaleBand().domain(murphyData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yMurphy = d3.scaleLinear().domain([0, 377]).range([heightMurphy, 0])

// add axis
murphy.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xMurphy).ticks(10))

murphy.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yMurphy).ticks(10))

// Text for bar chart
murphy.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .attr("fill", "rgb(101, 186, 170)")
    .text("Paul Murphy Stats");

let barMurphy = murphy.selectAll('.bar')
    .data(murphyData)
    .enter()


barMurphy.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xMurphy(data.title))
    .attr('y', (data) => yMurphy(data.value))
    .attr('height',(data) => heightMurphy - yMurphy(data.value))
    .attr('width', xMurphy.bandwidth())
    .on('mouseover', murphyTip.show)
    .on('mouseout', murphyTip.hide)