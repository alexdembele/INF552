const ctx = { 
    width: 960,
    height:540,
    date:2000

};

function createViz() {
    console.log("Using D3 v" + d3.version);
    

    CreateMap();
    CreateStats();
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
    var svg = d3.select("#main")
    .style("fill","rgb(211, 211, 211)")
    .append("svg")
    .attr("width", ctx.width)
    .attr("height", ctx.height)
    .attr("transform","translate(-80,10)")

    
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
    ctx.data=data
    let sdgColorScale = d3.scaleLinear()
    .domain([0, 50, 100]) // Les points de référence pour les couleurs
    .range(["red", "white", "green"]) // Les couleurs correspondantes
    //Colore la map avec le sdg_index_score
    let paysIndex={}
    
    data.forEach(element => {
        if(element.year==ctx.date)
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
    updateStats(data)
};


function CreateStats(data)
{
    let rec = d3.select("#stats").append("svg").attr("width", 800)
    .attr("height", 540)
    .attr("transform","translate(800,-540)")

    rec.append("rect")
    .attr('width', 800)
    .attr('height', 540)
    .attr('fill', 'lime')
    .style('opacity',0.1)

   rec.append("text")
   .attr("y",20)
   .text("Statistiques")  
    .style("font-size", "24px")  
    .style("font-weight", "bold");  

    debug()
}




function updateStats(data)
{
    

   
}


function changeDate()
{

let annee = parseInt(d3.select("#year-picker-input").property("value"))
if (annee>=2000 && annee<=2022)
{
    ctx.date=annee
    ColorMap(ctx.data)

}
console.log(annee)
}
