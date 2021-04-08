let talData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,1339,42
  Total Draw,1467,46
  Total Lose,382,12
  White Win,859,51
  White Draw,674,40
  White Lose,151,9
  Black Win,496,33
  Black Draw,797,53
  Black Lose,211,14
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginTal = { top: 20, right: 20, bottom: 30, left: 40 };

let heightTal = 500 - marginTal.top - marginTal.bottom;
let widthTal = 900 - marginTal.left - marginTal.right;

// Create svg with class name Chart
let tal = d3.select('.tal')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let talTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


tal.call(talTip)


let xTal = d3.scaleBand().domain(talData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yTal = d3.scaleLinear().domain([0, 3189]).range([heightTal, 0])

// add axis
tal.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xTal).ticks(10))

tal.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yTal).ticks(10))

// Text for bar chart
tal.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .attr("fill", "rgb(101, 186, 170)")
    .text("Mikhail Tal Stats");

let barTal = tal.selectAll('.bar')
    .data(talData)
    .enter()


barTal.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xTal(data.title))
    .attr('y', (data) => yTal(data.value))
    .attr('height',(data) => heightTal - yTal(data.value))
    .attr('width', xTal.bandwidth())
    .on('mouseover', talTip.show)
    .on('mouseout', talTip.hide)