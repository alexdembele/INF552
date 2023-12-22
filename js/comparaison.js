const cty = {
    paysGauche:"France",
    paysDroite:"Russia",
    


};

function CreateComparaison()
{

    
    let rec = d3.select("#compare").append("svg").attr("width", 1600)
    .attr("height", 500)
    .attr("transform","translate(0,-540)")

    rec.append("rect")
    .attr('width', 1600)
    .attr('height', 500)
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
    let compare=d3.select("#stats").append("g").attr("transform","translate(0,1000")
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




      

function updateComparaison()
{
    console.log(cty.paysGauche,cty.paysDroite)
}