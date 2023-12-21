const ctx = { 
    width: 960,
    height:540,
    date:2000,
    statCountry:"France"

};

function createViz() {
    console.log("Using D3 v" + d3.version);
    
    CreateHeader();
    CreateMap();
    CreateStats();
    LoadData();
    CreateComparaison();
    




};

function CreateHeader()
{
    let svg=d3.select("#header").append("svg").attr("width",400).attr("heigth",10)

    svg.append("text")
    .text("SDG index dans le monde")  
    .style("font-size", "30px")  
    .style("font-weight", "bold")
    .attr("y",30)
    .attr("stroke","green")

    let image = d3.select("#header").append("img").attr("id","pictoSDG")
        .attr("src","../Image/sdg_banner.jpg")
        .attr("alt","pictogramme sdg")
        .attr("width",300)
        .attr("height",150)
        .style("opacity",0)
        .attr("x",1000)

    svg.append("text")
    .text("Critère SDG : ")
    .style("font-size", "15px")  
    .attr("y",80)
    .attr("stroke","blue")
    
    


    svg.append("rect")
    .attr("height",20)
    .attr("width",20)
    .attr("y",67)
    .attr("x",100)
    .attr("fill","black")
    .on("mouseover", function (event,d) {
        d3.select(this).style("opacity", 0.5);
        

        d3.select("#pictoSDG").style("opacity",1)
        
    })
    .on("mouseout", function (event,d) {
        d3.select(this).style("opacity",1)
        d3.select("#pictoSDG").style("opacity",0)
       
        
    })


    let slider = d3.select("#header").append('input')
    .attr("type","range")
    .attr("id","year-picker-input")
    .attr("min","2000")
    .attr("max","2022")
    .attr("value","2000")
    .on("input",function(){changeDate()})

    let labelGlider = d3.select("#header").append("label")
    .attr("id","labelGliderAnnee")
    .attr("for","year-picker-input")
    .text("Choisissez une année : 2000 ")

    svg.append("rect")
    .attr("id","change")
    .attr("height",26)
    .attr("width",122)
    .attr("y",64)
    .attr("x",198)
    .attr("fill","#d3d3d3")
    .on("mouseover", function (event,d) {
        d3.selectAll("#change").style("opacity", 0.5);
        

        
        
    })
    .on("mouseout", function (event,d) {
        d3.selectAll("#change").style("opacity",1)
        
       
        
    })
    .on("click", function (event,d) {
        window.location.href="http://localhost:9999/multiligne.html"
    })
    

    svg.append("text").text("GrapheMultiligne").attr("id","change").attr("y",80).attr("x",200)
    .on("mouseover", function (event,d) {
        d3.selectAll("#change").style("opacity", 0.5);
        

        
        
    })
    .on("mouseout", function (event,d) {
        d3.selectAll("#change").style("opacity",1)
        
       
        
    })
    .on("click", function (event,d) {
        window.location.href="http://localhost:9999/multiligne.html"
    })

   
    
    
}

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

    let gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")   // Début du dégradé à 0% (gauche)
    .attr("x2", "100%"); // Fin du dégradé à 100% (droite)

    gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "green");  // Vert

    gradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "white");  // Blanc au milieu

    gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "red");    // Rouge

    svg.append("rect")
    .attr("width", 90)
    .attr("height", 160)
    .attr("x",100)
    .attr("y",400)
    .attr("height",20)
    .style("fill", "url(#gradient)");

    let echelleScale = d3.scaleLinear()
    .domain([0, 100]) // Les points de référence pour les couleurs
    .range([0,100]) // Les couleurs correspondantes

    let axeX = d3.axisBottom(echelleScale)
    axeX.ticks(5);
    svg.append("g")
    .attr("transform", "translate(100, 430)")  // Déplacer l'axe au bas du SVG
    .call(axeX);

    svg.append("text")
    .text("SDG Global Score")
    .attr("stroke","black")
    .style("font-size", "13px")
    .attr("x",100)
    .attr("y",380)



    
    d3.json("data/country-110m.json").then(function (world) {
    //Construction carte
    svg.selectAll("path")
    .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("path")
    .attr("d", path)
    //gestion souris
    .on("click", function (event,d) {
        console.log("Pays cliqué :", d.properties.name)
        ctx.statCountry = d.properties.name
        updateStats(ctx.data)
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
    d3.csv("data/sdg_index_2000-2022.csv").then(function (data) {
        ctx.data=data;
        
        ColorMap(data)}).catch(function (err) { console.log(err); });
};

function ColorMap(data)

{
    
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
    //Svg de la partie statistique
    let rec= d3.select("#stats").append("svg")
    .attr("width", 800)
    .attr("height", 540)
    .attr("transform","translate(800,-540)")
    
    // FOnd de la partie statistique
    rec.append("rect")
    .attr('width', 800)
    .attr('height', 540)
    .attr('fill', 'lime')
    .style('opacity',0.1)

    //Titre de la partie statistique
   rec.append("text")
   .attr("y",20)
   .text("Statistiques")  
    .style("font-size", "24px")  
    .style("font-weight", "bold"); 
    
    //Nom du pays dont on va montrer les stats
    rec.append("text")
    .attr("x",150)
    .attr("y",20)
    .attr("id","countryName")
    .text(ctx.statCountry)  
     .style("font-size", "18px")  
     .style("font-weight", "bold")
     .style("fill","blue")

    
}




function updateStats(data)
{
    let svg = d3.select("#stats svg")

    // On moddifie le nom du pays étudié
    d3.select("#countryName").text(ctx.statCountry)

   
}


function changeDate()
{

let annee = parseInt(d3.select("#year-picker-input").property("value"))
if (annee>=2000 && annee<=2022)
{
    ctx.date=annee
    ColorMap(ctx.data)

}
let label = d3.select("#labelGliderAnnee")
.text(`Choisir une année : ${ctx.date}`)
console.log(annee)
}
