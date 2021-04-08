let nakamuraData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,1455,43
  Total Draw,1319,39
  Total Lose,609,18
  White Win,831,49
  White Draw,628,37
  White Lose,237,14
  Black Win,641,38
  Black Draw,675,40
  Black Lose,371,22
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginNakamura = { top: 20, right: 20, bottom: 30, left: 40 };

let heightNakamura = 500 - marginNakamura.top - marginNakamura.bottom;
let widthNakamura = 900 - marginNakamura.left - marginNakamura.right;

// Create svg with class name Chart
let nakamura = d3.select('.nakamura')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let nakamuraTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


nakamura.call(nakamuraTip)


let xNakamura = d3.scaleBand().domain(nakamuraData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yNakamura = d3.scaleLinear().domain([0, 3383]).range([heightNakamura, 0])

// add axis
nakamura.append('g').attr('class', 'axis x')
  .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xNakamura).ticks(10))

nakamura.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yNakamura).ticks(10))

// Text for bar chart
nakamura.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .attr("fill", "rgb(101, 186, 170)")
    .text("Hikaru Nakamura Stats");

let nakamuraBar = nakamura.selectAll('.bar')
    .data(nakamuraData)
    .enter()


nakamuraBar.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xNakamura(data.title))
    .attr('y', (data) => yNakamura(data.value))
    .attr('height',(data) => heightNakamura - yNakamura(data.value))
    .attr('width', xNakamura.bandwidth())
    .on('mouseover', nakamuraTip.show)
    .on('mouseout', nakamuraTip.hide)