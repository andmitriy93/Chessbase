let capablancaData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,682,52
  Total Draw,434,33
  Total Lose,197,15
  White Win,476,55
  White Draw,242,28
  White Lose,147,17
  Black Win,204,46
  Black Draw,186,42
  Black Lose,53,12
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginCapa = { top: 20, right: 20, bottom: 30, left: 40 };

let heightCapa = 500 - marginCapa.top - marginCapa.bottom;
let widthCapa = 900 - marginCapa.left - marginCapa.right;

// Create svg with class name Chart
let capablanca = d3.select('.capablanca')
    .attr("height", height + marginCapa.top + marginCapa.bottom)
    .attr('width', width + marginCapa.left + marginCapa.right)
    .append('g')
    .attr('transform', 'translate(' + marginCapa.left + ',' + marginCapa.top + ')')

// Create tooltip
let capaTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


capablanca.call(capaTip)


let xCapa = d3.scaleBand().domain(capablancaData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yCapa = d3.scaleLinear().domain([0, 1311]).range([heightCapa, 0])

// add axis
capablanca.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xCapa).ticks(10))

capablanca.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yCapa).ticks(10))

// Text for bar chart
capablanca.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .text("Jose Raul Capablanca Stats");

let barCapa = capablanca.selectAll('.bar')
    .data(capablancaData)
    .enter()


barCapa.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xCapa(data.title))
    .attr('y', (data) => yCapa(data.value))
    .attr('height',(data) => heightCapa - yCapa(data.value))
    .attr('width', xCapa.bandwidth())
    .on('mouseover', capaTip.show)
    .on('mouseout', capaTip.hide)