let soData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,769,37
  Total Draw,998,48
  Total Lose,312,15
  White Win,448,43
  White Draw,469,45
  White Lose,125,12
  Black Win,310,30
  Black Draw,539,52
  Black Lose,186,18
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginSo = { top: 20, right: 20, bottom: 30, left: 40 };

let heightSo = 500 - marginSo.top - marginSo.bottom;
let widthSo = 900 - marginSo.left - marginSo.right;

// Create svg with class name Chart
let so = d3.select('.so')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let soTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


so.call(soTip)


let xSo = d3.scaleBand().domain(soData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let ySo = d3.scaleLinear().domain([0, 2079]).range([heightSo, 0])

// add axis
so.append('g').attr('class', 'axis x')
  .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xSo).ticks(10))

so.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(ySo).ticks(10))

// Text for bar chart
so.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .attr("fill", "rgb(101, 186, 170)")
    .text("Wesley So Stats");

let soBar = so.selectAll('.bar')
    .data(soData)
    .enter()


soBar.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xSo(data.title))
    .attr('y', (data) => ySo(data.value))
    .attr('height',(data) => heightSo - ySo(data.value))
    .attr('width', xSo.bandwidth())
    .on('mouseover', soTip.show)
    .on('mouseout', soTip.hide)