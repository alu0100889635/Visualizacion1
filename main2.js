map = () => {
  const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

  svg
    .append('path')
    .datum(border)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('d', path);

  svg
    .append('g')
    .selectAll('path')
    .data(topojson.feature(es, es.objects[active]).features)
    .join('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('d', path);

  svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('d', projection.getCompositionBorders());

  return svg.node();
}

border = topojson.mesh(es, es.objects.border)

projection = d3.geoConicConformalSpain().fitSize([width, height], border)

path = d3.geoPath().projection(projection)
height = 500

es = d3.json('https://unpkg.com/es-atlas@0.5.0/es/municipalities.json')

d3 = require('d3@6', 'd3-composite-projections@1.3')

topojson = require('topojson@3')