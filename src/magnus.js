let magnusData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,1325,44
  Total Draw,1235,41
  Total Lose,452,15
  White Win,795,52
  White Draw,535,35
  White Lose,199,13
  Black Win,534,36
  Black Draw,682,46
  Black Lose,267,18
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginMagnus = { top: 20, right: 20, bottom: 30, left: 40 };

let heightMagnus = 500 - marginMagnus.top - marginMagnus.bottom;
let widthMagnus = 900 - marginMagnus.left - marginMagnus.right;

// Create svg with class name Chart
let magnus = d3.select('.magnus')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let magnusTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


magnus.call(magnusTip)


let xMagnus = d3.scaleBand().domain(magnusData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yMagnus = d3.scaleLinear().domain([0, 3011]).range([heightMagnus, 0])

// add axis
magnus.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xMagnus).ticks(10))

magnus.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yMagnus).ticks(10))

// Text for bar chart
magnus.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .text("Bobby Fisher Stats");

let barMagnus = magnus.selectAll('.bar')
    .data(magnusData)
    .enter()


barMagnus.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xMagnus(data.title))
    .attr('y', (data) => yMagnus(data.value))
    .attr('height',(data) => heightMagnus - yMagnus(data.value))
    .attr('width', xMagnus.bandwidth())
    .on('mouseover', magnusTip.show)
    .on('mouseout', magnusTip.hide)