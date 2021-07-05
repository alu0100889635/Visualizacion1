import './style.css'

d3.select("body").append("h1").text("Islas Canarias, Granularidad 250m");
let width = 960, height = 500;
//Se usa una escala logarítmica para el colorf
let color1 = d3.scaleLog()
.base(10)
.domain([1,20])
.range(["aliceblue", "antiquewhite"]);

let color2 = d3.scaleLog()
.base(10)
.domain([1,20])
.range(["burlywood", "brown"]);

let svg1 = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

let svg2 = d3.select("svg")
.attr("width", width)
.attr("height", height);
  //Se crea un div para la etiqueta flotante.
  let div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
  //Se crea un div para la etiqueta flotante.

//objectmapa tiene que contener el array de características de los elementos path
let objectmapa1;
let objectmapa2;

//Carga de datos de geometría e indicadores.
  //Se utiliza la función queue para realizar una carga asíncrona
  //Se programa la función ready que se ejecuta cuando termina la carga de datos
  //Se pueden cargar letios ficheros, en este caso se fusionaron los datos y la geometríaf
  //en un único objeto geoJson
queue(1)
  .defer(d3.json, "datasets/indicadores_poblacion_municipios.geojson")
  .defer(d3.json, "datasets/grid250Canarias_poblacion.geojson")
  .await(ready);

  //Función de callback cuando se cargan los datos de geometría e indicadores
function ready(error, json1, json2) {
  if (error) return console.error(error);

  objectmapa1 = json1;
  objectmapa2 = json2;
  let scale  = 1;
  //Función de proyección
  let projection = d3.geoMercator()
      .center([-15.749, 28.536]) //elegidas las coordenadas para centrar el mapa.
      .scale(scale); //podemos utilizar un factor de escala
  projection.fitSize([width, height], objectmapa1)

  //Generador de caminos, requiere la proyección.
  let path = d3.geoPath()
    .projection(projection)

  let graticule = d3.geoGraticule();

  svg1.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

    svg2.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


  //Agregamos los caminos con los datos del mapa
  let u1 = svg1
            .selectAll('path')
            .data(objectmapa1.features);

  let u2 = svg2
            .selectAll('path')
            .data(objectmapa2.features);
  //Se añaden los path a la etiqueta svg
  //El atributo d de cada etiqueta path se asocia a los path creados con geoPath
  //(let path = d3.geoPath(projection))
  //el color de reslleno se asocia con los valores del indicador correspondiente
  u1.enter()
      .append('path')
      .attr('d', path)
      .attr("fill", function(d){
          let value = Math.log(d.properties.indicadores_municipal_TOTAL);
          return color1(value);
      })
      .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div	.html(d.properties.indicadores_municipal_MUNICIPIO+ "<br/>" +
                  "Total Municipio: " + d.properties.indicadores_municipal_TOTAL + "<br/>" +
                  "Hombres Municipio: " + d.properties.indicadores_municipal_Hombres +  "<br/>" +
                  "Mujeres Municipio: " + d.properties.indicadores_municipal_Mujeres +  "<br/>" +
                  "Españoles Municipio: " + d.properties.indicadores_municipal_Españoles +  "<br/>" +
                  "Extranjeros Municipio: " + d.properties.indicadores_municipal_Extranjeros +  "<br/>") 
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
      })

      u2.enter()
      .append('path')
      .attr('d', path)
      .attr("fill", function(d){
          let value = Math.log(d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"]);
          return color2(value);
      })
      .on("mouseover", function(d) {
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div	.html(d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_MUNICIPIO"]+ "<br/>" +
                  "Total Área 250m: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"] + "<br/>" +
                  "Hombres Área 250m: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Hombres"] +  "<br/>" +
                  "Mujeres Área 250m: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Mujeres"] +  "<br/>" +
                  "Españoles Área 250m: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Españoles"] + "<br/>" +
                  "Extranjeros Área 250m: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Extranjeros"]) 
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
      })
      .on("click", function(d){
                      console.log("Municipio: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_MUNICIPIO"]);
                      console.log("Total: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"]);
                      console.log("Hombres: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Hombres"]);
                      console.log("Mujeres: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Mujeres"]);
                      console.log("Españoles: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Españoles"]);
                      console.log("Extranjeros: " + d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_Extranjeros"]); 
                      console.log("----------------------------------------------")
                              });
  
}
