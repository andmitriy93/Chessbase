// const type = d => {
//   return {
//     rank: +d['Rank'],
//     opening: d.Opening,
//     win: +d['Win%'],
//     draw: +d['Draw%'],
//     points: +d['Points per 100 games']
//   }
// }

// d3.csv('White best openings.csv', type)
//   .then(d => {
//     console.log(d)
// })

let openingsData;

d3.csv('White best openings.csv', d => {
  return {
    rank: +d['Rank'],
    opening: d.Opening,
    win: +d['Win%'],
    draw: +d['Draw%'],
    points: +d['Points per 100 games']
  };
}).then(data => {
  openingsData = data;
})







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

//---------------------------------------------------------------------------------------------------------

// how to join data table
// const countryData = {
//     items: ['China', 'India', 'USA'],
//     addItem(item) {
//         this.items.push(item);
//     },
//     removeItem(index) {
//         this.item.splice(index, 1);
//     },
//     updateItem(index, newItem) {
//         this.items[index] = newItem;
//     }
// };
