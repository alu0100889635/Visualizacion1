import './style.css'

d3.select("body").append("h1").text("Islas Canarias, Granularidad 250m");
let width = 960, height = 500;
//Se usa una escala logarítmica para el colorf
let color = d3.scaleLog()
.base(10)
.domain([1,20])
.range(["aliceblue", "antiquewhite"]);


let svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);
  //Se crea un div para la etiqueta flotante.

//objectmapa tiene que contener el array de características de los elementos path
let objectmapa;

//Carga de datos de geometría e indicadores.
  //Se utiliza la función queue para realizar una carga asíncrona
  //Se programa la función ready que se ejecuta cuando termina la carga de datos
  //Se pueden cargar letios ficheros, en este caso se fusionaron los datos y la geometríaf
  //en un único objeto geoJson
queue(1)
  .defer(d3.json, "datasets/indicadores_poblacion_municipios.geojson")
  .await(ready);

  //Función de callback cuando se cargan los datos de geometría e indicadores
function ready(error, json0) {
  if (error) return console.error(error);

  objectmapa = json0;
  let scale  = 1;
  //Función de proyección
  let projection = d3.geoMercator()
      .center([-15.749, 28.536]) //elegidas las coordenadas para centrar el mapa.
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
          let value = Math.log(d.properties.indicadores_municipal_TOTAL);
          return color(value);
      })
}
