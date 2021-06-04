let svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
let path = d3.geoPath();
let projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
let data = d3.map();
let colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "datasets/indicadores_poblacion_municipios.geojson")
  .defer(d3.json, "datasets/grid250Canarias_poblacion.geojson", function(d) { data.set(d["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"], +d["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_MUNICIPIO"]); })
  .await(ready);

function ready(error, topo) {

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.properties.indicadores_municipal_TOTAL = data.get(d.id) || 0;
        return colorScale(d.properties.indicadores_municipal_TOTAL);
      });
    }