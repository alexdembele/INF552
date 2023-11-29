const ctx = { 
    width: 960,
    height:540,
    date:2000

};

function createViz() {
    console.log("Using D3 v" + d3.version);
    
    CreateMap();
    LoadData();




};

function CreateMap()
{
    // Création de la projection géographique
    var projection = d3.geoMercator()
    .scale(120)
    .translate([ctx.width / 2, ctx.height / 1.5]);

    var path = d3.geoPath().projection(projection);

    // Ajout de la carte au conteneur SVG
    var svg = d3.select("#main").append("svg")
    .attr("width", ctx.width)
    .attr("height", ctx.height);

    
    d3.json("data/country-110m.json").then(function (world) {
    //Construction carte
    svg.selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
    //gestion souris
    .on("click", function (event,d) {
        console.log("Pays cliqué :", d.properties.name)
    })
    .on("mouseover", function (d) {
        d3.select(this).style("opacity", 0.5);
    })
    .on("mouseout", function (d) {
        d3.select(this).style("opacity",1) 
        
    });
});
};

function LoadData()
{
    d3.csv("data/sdg_index_2000-2022.csv").then(function (data) {ColorMap(data)}).catch(function (err) { console.log(err); });
};

function ColorMap(data)
{
    let sdgColorScale = d3.scaleLinear()
    .domain([0, 50, 100]) // Les points de référence pour les couleurs
    .range(["red", "white", "green"]) // Les couleurs correspondantes
    //Colore la map avec le sdg_index_score
    let paysIndex={}
    
    data.forEach(element => {
        if(element.year==2000)
        {
            paysIndex[element.country]={sdg_index:element.sdg_index_score}
        }
    });
    

    d3.select("#main").selectAll("path")
    .style("fill",function (d) {
        
        if(paysIndex[d.properties.name]!=undefined)
        {
            
           return sdgColorScale(paysIndex[d.properties.name].sdg_index)
        }
        else
        {
            return "black"
        }
    }
         )

};