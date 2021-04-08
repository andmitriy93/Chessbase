let alekhineData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,1341,57
  Total Draw,635,27
  Total Lose,376,16
  White Win,893,58
  White Draw,385,25
  White Lose,262,17
  Black Win,447,15
  Black Draw,252,31
  Black Lose,114,14
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginAlekhine = { top: 20, right: 20, bottom: 30, left: 40 };

let heightAlekhine = 500 - marginAlekhine.top - marginAlekhine.bottom;
let widthAlekhine = 900 - marginAlekhine.left - marginAlekhine.right;

// Create svg with class name Chart
let alekhine = d3.select('.alekhine')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let alekhineTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


alekhine.call(alekhineTip)


let xAlekhine = d3.scaleBand().domain(alekhineData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yAlekhine = d3.scaleLinear().domain([0, 2352]).range([heightAlekhine, 0])

// add axis
alekhine.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xAlekhine).ticks(10))

alekhine.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yAlekhine).ticks(10))

// Text for bar chart
alekhine.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .attr("fill", "rgb(101, 186, 170)")
    .text("Alexander Alekhine Stats");

let alekhineTal = alekhine.selectAll('.bar')
    .data(alekhineData)
    .enter()


alekhineTal.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xAlekhine(data.title))
    .attr('y', (data) => yAlekhine(data.value))
    .attr('height',(data) => heightAlekhine - yAlekhine(data.value))
    .attr('width', xAlekhine.bandwidth())
    .on('mouseover', alekhineTip.show)
    .on('mouseout', alekhineTip.hide)