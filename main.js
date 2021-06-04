import './style.css';

//set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 90, left: 40},
    width = 480 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

//append the svg object to the body of the page
const svg = d3.select("#barras")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Parse the Data
d3.csv("datasets/pasajeros_2020.csv", function(data) {
  const filteredData = data.filter(r => r.Puerto)
  const units = filteredData.map(r => parseInt(r.Unidades))
  const origins = filteredData.map(r => r.Puerto)


  // X axis
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(origins)
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, Math.max(...units)])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("barras")
    .data(filteredData)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.Puerto))
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", (d) => height - y(0)) // always equal to 0
    .attr("y", (d) => y(0))

  //Animation
  svg.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", (d) => y(d.Unidades))
    .attr("height", (d) => height - y(d.Unidades))

  });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Diagrama de burbujas
  const margin2 = {top: 10, right: 20, bottom: 30, left: 50},
    width2 = 900 - margin2.left - margin2.right,
    height2 = 500 - margin2.top - margin2.bottom;

  // append the svg object to the body of the page
  const svg2 = d3.select("#burbujas")
    .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");

  //Read the data
  d3.csv("datasets/pasajeros_2020.csv", function(data) {

    //const filteredData = data.filter(r => r.Puerto)
    const units = data.map(r => parseInt(r.Unidades))
    const origins = data.map(r => r.Mes)
    const ports = data.map(r => r["Puerto.Destino"])
    // Add X axis
    let x2 = d3.scaleBand()
      .domain(origins)
      .range([ 0, width2 ]);
    svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2));

    // Add Y axis
    let y2 = d3.scaleLinear()
      .domain([0, Math.max(...units)])
      .range([ height2, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y2));

    let z2 = d3.scaleBand()
    .domain(ports)
    .range([0, 40]);

    // Add a scale for bubble color
    let myColor = d3.scaleOrdinal()
      .domain(["LA ESTACA (EL HIERRO)", "LOS CRISTIANOS", "S/C DE LA PALMA", "S/C DE TENERIFE", "S/S DE LA GOMERA"])
      .range(d3.schemeSet2);

    // Add dots
    svg2.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x2(d.Mes); } )
        .attr("cy", function (d) { return y2(parseInt(d.Unidades)); } )
        .attr("r", function (d) { return z2(d["Puerto.Destino"]); } )
        .style("fill", function (d) { return myColor(d["Puerto.Destino"]); } )
        .style("opacity", "0.7")
        .attr("stroke", "white")
        .style("stroke-width", "2px")

    });

//////////////////////////////////////////////////////////////////////////////////////////////////
//Diagrama Sankey
const units3 = "Widgets";

// set the dimensions and margins of the graph
const margin3 = {top: 10, right: 10, bottom: 10, left: 10},
    width3 = 700 - margin3.left - margin3.right,
    height3 = 300 - margin3.top - margin3.bottom;

// format constiables
const formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units3; },
    color = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
const svg3 = d3.select("body").append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin3.left + "," + margin3.top + ")");

// Set the sankey diagram properties
const sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([width3, height3]);

const path = sankey.link();

// load the data
d3.csv("datasets/sankey.csv", function(error, data) {
  
  //set up graph in same style as original example but empty
  const graph = {"nodes" : [], "links" : []};

  data.forEach(function (d) {
    graph.nodes.push({ "name": d.source });
    graph.nodes.push({ "name": d.target });
    graph.links.push({ "source": d.source,
                       "target": d.target,
                       "value": +d.value });
   });

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(d3.nest()
    .key(function (d) { return d.name; })
    .object(graph.nodes));

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
  });

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = { "name": d };
  });

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);

  // add in the links
  const link = svg3.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  // add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });

  // add in the nodes
  const node = svg3.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) {
          return d;
        })
        .on("start", function() {
          this.parentNode.appendChild(this);
        })
        .on("drag", dragmove));

  // add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
		  return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
		  return d.name + "\n" + format(d.value); });

  // add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width3 / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform", 
            "translate(" 
               + d.x + "," 
               + (d.y = Math.max(
                  0, Math.min(height3 - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
});

