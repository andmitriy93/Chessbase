let botvinnikData = d3.csvParse(
  `Title,Results%,Percents
  Total Win,646,49
  Total Draw,514,39
  Total Lose,158,12
  White Win,361,53
  White Draw,259,38
  White Lose,61,9
  Black Win,280,44
  Black Draw,261,41
  Black Lose,95,15
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents
    }
  }
)

let marginBot = { top: 20, right: 20, bottom: 30, left: 40 };

let heightBot = 500 - marginBot.top - marginBot.bottom;
let widthBot = 900 - marginBot.left - marginBot.right;

// Create svg with class name Chart
let botvinnik = d3.select('.botvinnik')
    .attr("height", height + marginBot.top + marginBot.bottom)
    .attr('width', width + marginBot.left + marginBot.right)
    .append('g')
    .attr('transform', 'translate(' + marginBot.left + ',' + marginBot.top + ')')

// Create tooltip
let botTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


botvinnik.call(botTip)


let xBot = d3.scaleBand().domain(botvinnikData.map(d => d.title)).rangeRound([1, 800]).padding(0.1)
let yBot = d3.scaleLinear().domain([0, 1318]).range([heightBot, 0])

// add axis
botvinnik.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(xBot).ticks(10))

botvinnik.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(yBot).ticks(10))

// Text for bar chart
botvinnik.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "middle")
    .attr('font-size', 20)
    .text("Mikhail Botvinnik Stats");

let barBot = botvinnik.selectAll('.bar')
    .data(botvinnikData)
    .enter()


barBot.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  15 + xBot(data.title))
    .attr('y', (data) => yBot(data.value))
    .attr('height',(data) => heightBot - yBot(data.value))
    .attr('width', xBot.bandwidth())
    .on('mouseover', botTip.show)
    .on('mouseout', botTip.hide)