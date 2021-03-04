let openings = d3.csvParse(`Rank,Opening,Win%,Draw%,Points per 100 games
1,Queen's Gambit,40,36,58
2,Blackmar Diemer Gambit,49,16,57
3,Ruy Lopez,40,33,56.5
4,Bishop's Opening,41,30,56
5,Benko Opening,38,35,55.5
5,Reti Opening,37,37,55.5
5,Vienna Game,41,29,55.5
8,Centre Game,44,22,55
8,English Opening,38,34,55
8,Scotch Game,40,30,55
`, function(d){
  return {
    rank: +d['Rank'],
    opening: d.Opening,
    win: +d['Win%'],
    draw: +d['Draw%'],
    points: +d['Points per 100 games']
  }
})


const xScale = d3.scaleBand()   // ordinal scale every iteam have the same width
    .domain(openings.map(dataPoint => dataPoint.opening))
    .rangeRound([0, 500])       // tells from the array how much space is available from 0 to max width
    .padding(0.1);              // find % padding between iteams

const yScale = d3.scaleLinear() // allow to calculate right height as a value of data
    .domain([0, 100])            // allow specify min and max value we able to map into chart
    .range([300, 0]);           // actual available space in px

const container = d3.select('svg')
    .classed('container', true)

const bars = container
    .selectAll('.bar')
    .data(openings)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', xScale.bandwidth()) // the same as style in div, attr for svg elements
    .attr('height', data => 300 - yScale(data.points)) // from max height we minus yScale to looks charts how we used to see
    .attr('x', data => xScale(data.opening)) // set width basis on fucntion
    .attr('y', data => yScale(data.points))




// const DUMMY_DATA = [
//     { id: 'd1', value: 10, region: 'USA'},
//     { id: 'd2', value: 11, region: 'India'},
//     { id: 'd3', value: 12, region: 'China'},
//     { id: 'd4', value: 13, region: 'Germany'},
//     { id: 'd5', value: 5, region: 'Kyrgyzstan'},
// ]

// // scaleBand, scaleLinear don give width and height instead give us function to allow us
// // translate a value to a number. Allow us to set position and sizes withing the coord
// const xScale = d3.scaleBand()   // ordinal scale every iteam have the same width
//     .domain(DUMMY_DATA.map(dataPoint => dataPoint.region))
//     .rangeRound([0, 500])       // tells from the array how much space is available from 0 to max width
//     .padding(0.1);              // find % padding between iteams

// const yScale = d3.scaleLinear() // allow to calculate right height as a value of data
//     .domain([0, 15])            // allow specify min and max value we able to map into chart
//     .range([300, 0]);           // actual available space in px

// const container = d3.select('svg')
//     .classed('container', true)

// const bars = container
//     .selectAll('.bar')
//     .data(DUMMY_DATA)
//     .enter()
//     .append('rect')
//     .classed('bar', true)
//     .attr('width', xScale.bandwidth()) // the same as style in div, attr for svg elements
//     .attr('height', data => 300 - yScale(data.value)) // from max height we minus yScale to looks charts how we used to see
//     .attr('x', data => xScale(data.region)) // set width basis on fucntion
//     .attr('y', data => yScale(data.value))

