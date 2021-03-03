const DUMMY_DATA = [
    { id: 'd1', value: 10, region: 'USA'},
    { id: 'd2', value: 11, region: 'India'},
    { id: 'd3', value: 12, region: 'China'},
    { id: 'd4', value: 13, region: 'Germany'},
    { id: 'd5', value: 5, region: 'Kyrgyzstan'},
]

const xScale = d3.scaleBand().rangeRound([0, 500]).padding(0.1);
const yScale = d3.scaleLinear().domain([0, 15]).range([300, 0]);

const container = d3.select('svg')
    .classed('container', true)

const bars = container
    .selectAll('.bar')
    .data(DUMMY_DATA)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', 50) /* the same as style in div, attr for svg elements */
    .attr('height', data => (data.value * 15))