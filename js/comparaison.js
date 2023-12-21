const cty = {
    paysGauche:"France",
    paysDroite:"Russia",
    


};

function CreateComparaison()
{

    
    let rec = d3.select("#compare").append("svg").attr("width", 1600)
    .attr("height", 540)
    .attr("transform","translate(0,-540)")

    rec.append("rect")
    .attr('width', 1600)
    .attr('height', 540)
    .attr('fill', 'light blue')
    .style('opacity',0.1)

    rec.append("text")
   .attr("y",20)
   .text("Comparaison")  
    .style("font-size", "24px")  
    .style("font-weight", "bold");

    d3.csv("data/sustainable_development_report_2023.csv").then(function (data) {
        CreateSelecteur(data)
        GraphMultiLigne()}).catch(function (err) { console.log(err); });
    
    
}
function CreateSelecteur(data)
{
    let compare=d3.select("#compare").append("g").attr("transform","translate(0,1000")
    let selecteur1 = compare.append('select').attr("y",0).attr("id","countrySelector1")
    let selecteur2 = compare.append("select").attr("y",0).attr("id","countrySelector2")

    let countries=data.map(d => d.country);
    //selecteur1 = d3.select("#countrySelect1");
    //selecteur2 = d3.select("#countrySelect2");

    
    

    selecteur1.selectAll('myOptions')
 	.data(countries)
  .enter()
	.append('option')
  .text(function (d) { return d; }) 
  .attr("value", function (d) { return d; })

    selecteur2.selectAll('myOptions') 
    .data(countries)
    .enter()
    .append('option')
    .text(function (d) { return d; }) 
    .attr("value", function (d) { return d; })

    selecteur1.on("change", function () { 
        cty.paysGauche = d3.select(this).property("value");
         updateComparaison()  });

    selecteur2.on("change", function () { 
        cty.paysDroite= d3.select(this).property("value");
        updateComparaison()   });

    console.log(selecteur1.property("value"))
}
cty.selecteur1 = d3.select("#countrySelect1");
cty.selecteur2 = d3.select("#countrySelect2");
cty.selecteur1.on("change", function () { 
    cty.paysGauche = d3.select(this).property("value");
     updateComparaison()  });

cty.selecteur2.on("change", function () { 
    cty.paysDroite= d3.select(this).property("value");
    updateComparaison()   });


function GraphMultiLigne()
{
    //creation selecteur goal
    let selecteur= d3.select("#compare").append("select")
    .attr("id","multiLigne")
    .attr("width", 1600)
    .attr("height", 540)
    .attr("transform","translate(0,-540)")
    let goals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,"global"]
    

    selecteur.selectAll('myOptions')
 	.data(goals)
    .enter()
	.append('option')
    .text(function (d) { return d; }) 
    .attr("value", function (d) { return d; })

    selecteur.on("change", function () { 
        
        let A =d3.select(this).property("value");
        updateMultiLigne(A)
           });

    
    
    
    

    d3.csv("data/sdg_index_2000-2022.csv").then(function (data) {
        multiLigne(data)}).catch(function (err) { console.log(err); });
    

    
    
    

}
cty.selecteur = d3.select("#multiLigne");
cty.selecteur.on("change", function () { 
        
        cty.A =d3.select(this).property("value");
        updateMultiLigne()
           });

function multiLigne(data)
{
    let svg = d3.select("#compare").append("svg").attr("width", 1600)
    .attr("height", 540)
    .attr("transform","translate(0,-540)")
    //scale de répartition sur l'axe x
    let xScale = d3.scaleLinear()
    .domain([2000, 2022])
    .range([50,1550]);
    let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([10,530]);

    // créer un array [{pays:Nom , sdg:[] , goal1:[],... goal17:[]}]
    let indice="sdg"
    let arrayData = []
    let current = "A"
    let i = -1
    data.forEach(element => {
        if (element.country != current)
        {
            i=i+1
            current=element.country
            arrayData.push([{"pays":current,"sdg":element.sdg_index_score,"goal1":element.goal_1_score,
            "goal2":element.goal_2_score,
            "goal3":element.goal_3_score,
            "goal4":element.goal_4_score,
            "goal5":element.goal_5_score,
            "goal6":element.goal_6_score,
            "goal7":element.goal_7_score,
            "goal8":element.goal_8_score,
            "goal9":element.goal_9_score,
            "goal10":element.goal_10_score,
            "goal11":element.goal_11_score,
            "goal12":element.goal_12_score,
            "goal13":element.goal_13_score,
            "goal14":element.goal_14_score,
            "goal15":element.goal_15_score,
            "goal16":element.goal_16_score,
            "goal17":element.goal_17_score,
            "date":element.year
        }])
        }
        else
        {
            arrayData[i].push({"pays":current,"sdg":element.sdg_index_score,"goal1":element.goal_1_score,
            "goal2":element.goal_2_score,
            "goal3":element.goal_3_score,
            "goal4":element.goal_4_score,
            "goal5":element.goal_5_score,
            "goal6":element.goal_6_score,
            "goal7":element.goal_7_score,
            "goal8":element.goal_8_score,
            "goal9":element.goal_9_score,
            "goal10":element.goal_10_score,
            "goal11":element.goal_11_score,
            "goal12":element.goal_12_score,
            "goal13":element.goal_13_score,
            "goal14":element.goal_14_score,
            "goal15":element.goal_15_score,
            "goal16":element.goal_16_score,
            "goal17":element.goal_17_score,
            "date":element.year
        })
        }

        
    });

    let lineGenerator = d3.line()
    .x(d =>xScale(d["date"]) )
    .y(d=> yScale(d["sdg"]))
    console.log(arrayData[0][0])

    svg.selectAll("path")
    .data(arrayData)
    .enter()
    .append("path")
    .attr("fill","none")
    .attr("stroke","gray")
    .attr("stroke-width", 0.1)
    .attr("d", lineGenerator)


}
function updateMultiLigne(A)
{
    console.log(A)

}
function updateComparaison()
{
    console.log(cty.paysGauche,cty.paysDroite)
}