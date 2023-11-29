const ctx = { 
    width: 960,
    height:540
};

function createViz() {
    console.log("Using D3 v" + d3.version);
    
    // Création de la projection géographique
    var projection = d3.geoMercator()
    .scale(120)
    .translate([ctx.width / 2, ctx.height / 1.5]);

    var path = d3.geoPath().projection(projection);

    // Ajout de la carte au conteneur SVG
    var svg = d3.select("#main").append("svg")
    .attr("width", ctx.width)
    .attr("height", ctx.height);

    // Charge les données géographiques
    d3.json("data/country-110m.json").then(function (world) {
    // Ajoute les pays à la carte
    console.log(topojson.feature(world, world.objects.countries).features)
    svg.selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
    .on("click", function (event,d) {
        // Gestion de l'événement de clic

        console.log("Pays cliqué :", d.properties.name)
    });
});


};

