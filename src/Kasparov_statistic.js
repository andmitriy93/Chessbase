// date,win,lose,draw
// 2013-12,3,0,0
// 2014-08,18,5,17
// 2015-04,28,8,37
// 2015-12,40,16,47
// 2016-08,60,18,75
// 2017-04,71,20,98
// 2017-12,87,25,119
// 2018-08,104,27,157
// 2019-04,110,27,190
// 2019-12,136,27,225
// 2020-08,141,27,238
// 2021-04,149,30,250


// let data = [
//   // {symbol: 'w', date: 'Dec 2013', value: 3},
//   // {symbol: 'w', date: 'Aug 2014', value: 18},
//   // {symbol: 'w', date: 'Apr 2015', value: 28},
//   // {symbol: 'w', date: 'Dec 2015', value: 40},
//   // {symbol: 'w', date: 'Aug 2016', value: 60},
//   // {symbol: 'w', date: 'Apr 2017', value: 71},
//   // {symbol: 'w', date: 'Dec 2017', value: 87},
//   // {symbol: 'w', date: 'Aug 2018', value: 104},
//   // {symbol: 'w', date: 'Apr 2019', value: 110},
//   // {symbol: 'w', date: 'Dec 2019', value: 136},
//   // {symbol: 'w', date: 'Aug 2020', value: 141},
//   // {symbol: 'w', date: 'Apr 2021', value: 149},
//   // {symbol: 'l', date: 'Dec 2013', value: 0},
//   // {symbol: 'l', date: 'Aug 2014', value: 5},
//   // {symbol: 'l', date: 'Apr 2015', value: 8},
//   // {symbol: 'l', date: 'Dec 2015', value: 16},
//   // {symbol: 'l', date: 'Aug 2016', value: 18},
//   // {symbol: 'l', date: 'Apr 2017', value: 20},
//   // {symbol: 'l', date: 'Dec 2017', value: 25},
//   // {symbol: 'l', date: 'Aug 2018', value: 27},
//   // {symbol: 'l', date: 'Apr 2019', value: 27},
//   // {symbol: 'l', date: 'Dec 2019', value: 27},
//   // {symbol: 'l', date: 'Aug 2020', value: 27},
//   // {symbol: 'l', date: 'Apr 2021', value: 27},
//   // {symbol: 'd', date: 'Dec 2013', value: 0},
//   // {symbol: 'd', date: 'Aug 2014', value: 17},
//   // {symbol: 'd', date: 'Apr 2015', value: 37},
//   // {symbol: 'd', date: 'Dec 2015', value: 47},
//   // {symbol: 'd', date: 'Aug 2016', value: 75},
//   // {symbol: 'd', date: 'Apr 2017', value: 98},
//   // {symbol: 'd', date: 'Dec 2017', value: 119},
//   // {symbol: 'd', date: 'Aug 2018', value: 157},
//   // {symbol: 'd', date: 'Apr 2019', value: 190},
//   // {symbol: 'd', date: 'Dec 2019', value: 225},
//   // {symbol: 'd', date: 'Aug 2020', value: 238},
//   // {symbol: 'd', date: 'Apr 2021', value: 250}

//   // {symbol: 'w', date: 'Dec 2013', value: 3},
//   // {symbol: 'w', date: 'Aug 2014', value: 18},
//   { symbol: "w", date: 2015, value: 28 },
//   { symbol: "w", date: 2015, value: 40 },
//   { symbol: "w", date: 2016, value: 60 },
//   { symbol: "w", date: 2017, value: 71 },
//   { symbol: "w", date: 2017, value: 87 },
//   { symbol: "w", date: 2018, value: 104 },
//   { symbol: "w", date: 2019, value: 110 },
//   { symbol: "w", date: 2019, value: 136 },
//   { symbol: "w", date: 2020, value: 141 },
//   { symbol: "w", date: 2021, value: 149 },
//   { symbol: "l", date: 2013, value: 0 },
//   { symbol: "l", date: 2014, value: 5 },
//   { symbol: "l", date: 2015, value: 8 },
//   { symbol: "l", date: 2015, value: 16 },
//   { symbol: "l", date: 2016, value: 18 },
//   { symbol: "l", date: 2017, value: 20 },
//   { symbol: "l", date: 2017, value: 25 },
//   { symbol: "l", date: 2018, value: 27 },
//   { symbol: "l", date: 2019, value: 27 },
//   { symbol: "l", date: 2019, value: 27 },
//   { symbol: "l", date: 2020, value: 27 },
//   { symbol: "l", date: 2021, value: 27 },
//   { symbol: "d", date: 2013, value: 0 },
//   { symbol: "d", date: 2014, value: 17 },
//   { symbol: "d", date: 2015, value: 37 },
//   { symbol: "d", date: 2015, value: 47 },
//   { symbol: "d", date: 2016, value: 75 },
//   { symbol: "d", date: 2017, value: 98 },
//   { symbol: "d", date: 2017, value: 119 },
//   { symbol: "d", date: 2018, value: 157 },
//   { symbol: "d", date: 2019, value: 190 },
//   { symbol: "d", date: 2019, value: 225 },
//   { symbol: "d", date: 2020, value: 238 },
//   { symbol: "d", date: 2021, value: 250 },
// ];

let harryKasparov = d3.csvParse(
  `Title,Results%,Percents
  Total Win,1197,50
  Total Draw,1005,42
  Total Lose,192,8
  White,780,59
  Black,407,38
  `,
  function (d) {
    return {
      title: d.Title,
      value: +d['Results%'],
      percents: +d.Percents,
    }
  }
)

let margin4 = { top: 20, right: 20, bottom: 30, left: 40 };

let height4 = 500 - margin4.top - margin4.bottom;
let width4 = 900 - margin4.left - margin4.right;

// Create svg with class name Chart
let harry = d3.select('.harry-stats')
    .attr("height", height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Create tooltip
let harryTip = tip
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(event,d) {
              return `<strong>${d.percents}%</strong><br>${d.value} games`
            })


harry.call(harryTip)


let x5 = d3.scaleBand().domain(harryKasparov.map(d => d.title)).rangeRound([1, 620]).padding(0.1)
let y5 = d3.scaleLinear().domain([0, 2394]).range([height4, 0])

// add axis
harry.append('g').attr('class', 'axis x')
    .attr('transform', 'translate(10,' + height + ')')
    .call(d3.axisBottom(x5).ticks(20))

harry.append('g').attr('class', 'axis y')
    .attr('transform', 'translate(10, 0)')
    .call(d3.axisLeft(y5).ticks(10))

// Text for bar chart
harry.append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", 20)
    // .attr("dy", "0.71em")
    .attr('x', 500)
    .attr("text-anchor", "end")
    .attr('font-size', 40)
    .text("Harry Kasparov Stats");

let barHarry = harry.selectAll('.bar')
    .data(harryKasparov)
    .enter()


barHarry.append('rect')
    .attr('class', 'bar')
    .attr('x', (data) =>  25 + x5(data.title))
    .attr('y', (data) => y5(data.value))
    .attr('height',(data) => height - y5(data.value))
    .attr('width', x5.bandwidth())
    .on('mouseover', harryTip.show)
    .on('mouseout', harryTip.hide)












// let parseTime = d3.timeParse("%Y");

// data.forEach(function (d) {
//   d.date = parseTime(d.date);
// });

// let graph = d3
//   .select(".harry-stats")
//   // .attr("height", height4 + margin4.top + margin4.bottom)
//   // .attr('width', width4 + margin4.left + margin4.right)
//   .append("g")
//   .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

// //scale xAxis
// let xExtent = d3.extent(data, (d) => d.date);
// xScale = d3.scaleTime().domain(xExtent).range([margin4.left, 900]);

// //scale yAxis
// let yMax = d3.max(data, (d) => d.value);
// yScale = d3
//   .scaleLinear()
//   .domain([0, yMax + 20])
//   .range([500, 0]); // 20 - its margin.top

// //draw xAxis and xAxis label
// xAxis = d3.axisBottom().scale(xScale);

// graph
//   .append("g")
//   .attr("class", "axis")
//   .attr("transform", "translate(0, 520)")
//   .call(xAxis)
//   .append("text")
//   .attr("x", (900 + 70) / 2) // middle of the xAxis
//   .attr("y", 50) // a little bit below xAxis
//   .attr("fill", "black")
//   .attr("font-size", "18")
//   .text("Year");

// //yAxis and yAxis label
// yAxis = d3.axisLeft().scale(yScale).ticks(10);

// graph
//   .append("g")
//   .attr("class", "axis")
//   .attr("transform", `translate(${margin4.left}, 20)`)
//   .call(yAxis)
//   .append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("x", -150)
//   .attr("y", -40)
//   .attr("text-anchor", "end")
//   .attr("font-size", "18")
//   .attr("fill", "black")
//   .text("Games");

