import './style.css';
import { readCSV } from './toJson';
const csv=require('csvtojson');

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

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
<<<<<<< HEAD
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
  //Diagrama de burbujas
  const margin2 = {top: 10, right: 20, bottom: 30, left: 250},
    width2 = 900 - margin2.left - margin2.right,
=======
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Diagrama de burbujas
  const margin2 = {top: 10, right: 20, bottom: 100, left: 70},
    width2 = 800 - margin2.left - margin2.right,
>>>>>>> f5fe9157b8c30ed19cf626062dba8a5d37fbf63b
    height2 = 500 - margin2.top - margin2.bottom;

  // append the svg object to the body of the page
  const svg2 = d3.select("#burbujas")
    .append("svg")
      .attr("margin-right", width2 + 150 + margin2.left + margin2.right)
      .attr("width", width2 + 150 + margin2.left + margin2.right)
      .attr("height", height2 + 150 + margin2.top + margin2.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");

  //Read the data
  d3.csv("datasets/pasajeros_2020.csv", function(data) {

    //const filteredData = data.filter(r => r.Puerto)
    const units = data.map(r => parseInt(r.Unidades)).filter(units => units <= 50)
    const months = data.map(r => r.Mes)
    const origins = data.map(r => r["Puerto.Origen"])
    const targets = data.map(r => r["Puerto.Destino"])

    //Sumar las toneladas que han llegado a cada puerto en un mes
    //const unitsPerPort = data.map(r => r.Puerto)
    // Add X axis
    let x2 = d3.scaleBand()
      .domain(targets)
      .range([ 0, width2 ]);
    svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    let y2 = d3.scaleBand()
      .domain(origins)
      .range([ height2, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y2));

<<<<<<< HEAD
    let z2 = d3.scaleLinear()
    .domain([0, Math.max(...units)])
=======
    let z2 = d3.scaleBand()
    .domain(units)
>>>>>>> f5fe9157b8c30ed19cf626062dba8a5d37fbf63b
    .range([4, 20]);

    // Add a scale for bubble color
    let myColor = d3.scaleOrdinal()
      .domain(["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"])
      //.domain(["LA ESTACA (EL HIERRO)", "LOS CRISTIANOS", "S/C DE LA PALMA", "S/C DE TENERIFE", "S/S DE LA GOMERA"])
      .range(d3.schemeSet2);

    // Add dots
    svg2.append('g')
      .selectAll("dot")
<<<<<<< HEAD
      .data(data.filter(r => parseInt(r.Unidades) <= 50))
=======
      .data(data.filter(units => units <= 50))
>>>>>>> f5fe9157b8c30ed19cf626062dba8a5d37fbf63b
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x2(d["Puerto.Destino"]); } )
        .attr("cy", function (d) { return y2(d["Puerto.Origen"]); } )
        .attr("r", function (d) { return z2(parseInt(d.Unidades)); } )
<<<<<<< HEAD
        .style("fill", function (d) { return myColor(d.Mes); } )
=======
        .style("fill", function (d) { return myColor(d.Puerto); } )
>>>>>>> f5fe9157b8c30ed19cf626062dba8a5d37fbf63b
        .style("opacity", "0.7")
        .attr("stroke", "white")
        .style("stroke-width", "2px")

    });

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
<<<<<<< HEAD
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
=======
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
>>>>>>> f5fe9157b8c30ed19cf626062dba8a5d37fbf63b
//Diagrama Sankey


readCSV("datasets/mercancias_short.csv");
let margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#sankey").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Color scale used
let color = d3.scaleOrdinal(d3.schemeCategory20);

// Set the sankey diagram properties
let sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(290)
    .size([width, height]);

// load the data
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_sankey.json", function(error, graph) {

  // Constructs a new Sankey generator with the default settings.
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(1);

  // add in the links
  let link = svg.append("g")
    .selectAll(".link")
    .data(graph.links)
    .enter()
    .append("path")
      .attr("class", "link")
      .attr("d", sankey.link() )
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });

  // add in the nodes
  let node = svg.append("g")
    .selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .call(d3.drag()
        .subject(function(d) { return d; })
        .on("start", function() { this.parentNode.appendChild(this); })
        .on("drag", dragmove));

  // add the rectangles for the nodes
  node
    .append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
    // Add hover text
    .append("title")
      .text(function(d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; });

  // add in the title for the nodes
    node
      .append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this)
      .attr("transform",
            "translate("
               + d.x + ","
               + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
                 ) + ")");
    sankey.relayout();
    link.attr("d", sankey.link() );
  }

});

