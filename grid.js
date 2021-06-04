import './style.css'

let width = 960, height = 500;
let color = d3.scaleLog()
.base(10)
.domain([1,20])
.range(["burlywood", "brown"]);

let svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);
  //Se crea un div para la etiqueta flotante.
  let div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
      
//objectmapa tiene que contener el array de características de los elementos path
let objectmapa;

//Carga de datos de geometría e indicadores.
  //Se utiliza la función queue para realizar una carga asíncrona
  //Se programa la función ready que se ejecuta cuando termina la carga de datos
  //Se pueden cargar letios ficheros, en este caso se fusionaron los datos y la geometríaf
  //en un único objeto geoJson
queue()
  .defer(d3.json, "datasets/prueba.geojson")
  .await(ready);

  //Función de callback cuando se cargan los datos de geometría e indicadores
function ready(error, json0) {
if (error) return console.error(error);

objectmapa = json0;
let scale  = 1;
//Función de proyección
let projection = d3.geoMercator()
    .center([0, 0]) //elegidas las coordenadas para centrar el mapa.
    .scale(scale); //podemos utilizar un factor de escala
projection.fitSize([width, height], objectmapa)

//Generador de caminos, requiere la proyección.
let path = d3.geoPath()
  .projection(projection)

let graticule = d3.geoGraticule();

svg.append("path")
  .datum(graticule)
  .attr("class", "graticule")
  .attr("d", path);


//Agregamos los caminos con los datos del mapa
let u = svg
          .selectAll('path')
          .data(objectmapa.features);

//Se añaden los path a la etiqueta svg
//El atributo d de cada etiqueta path se asocia a los path creados con geoPath
//(let path = d3.geoPath(projection))
//el color de reslleno se asocia con los valores del indicador correspondiente
u.enter()
    .append('path')
    .attr('d', path)
    .attr("fill", function(d){
        let value = Math.log(d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"]);
        return color(value);
    })
    .on("mouseover", function(d) {
      div.transition()
          .duration(200)
          .style("opacity", .9);
      div	.html(d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_MUNICIPIO"]+ "<br/>" +
                d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"])
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    })
    .on("click", function(d){
                    console.log(d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_MUNICIPIO"]);
                    console.log(d.properties["PMH_SD_20170101_Indicadores_Descarga ISB-ULL_TOTAL"])
                            });
}