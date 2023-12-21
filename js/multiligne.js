const cty=
{
    pays:"France"
}

function initViz()
{
    initHeader();
    CreateMultiLigne();
}

function initHeader()
{
    let svg=d3.select("#header").append("svg").attr("width",400).attr("heigth",10)

    svg.append("text")
    .text("SDG index dans le monde")  
    .style("font-size", "30px")  
    .style("font-weight", "bold")
    .attr("y",30)
    .attr("stroke","green")

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
        window.location.href="http://localhost:9999/index.html"
    })
    

    svg.append("text").text("GrapheMultiligne").attr("id","change").attr("y",80).attr("x",200)
    .on("mouseover", function (event,d) {
        d3.selectAll("#change").style("opacity", 0.5);
        

        
        
    })
    .on("mouseout", function (event,d) {
        d3.selectAll("#change").style("opacity",1)
        
       
        
    })
    .on("click", function (event,d) {
        window.location.href="http://localhost:9999/index.html"
    })
}

function CreateMultiLigne()
{
    //creation selecteur goal
    let selecteur= d3.select("#header").append("select")
    .attr("id","multiLigne")
    
    .attr("transform","translate(0,-540)")
    let label = d3.select("#header").append("label")
    .attr("for","multiligne")
    .text("  Choisissez un goal ")
    .attr("stroke","green")
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
        
        let A =d3.select(this).property("value");
        updateMultiLigne(A)
           });

function multiLigne(data)
{
               let svg = d3.select("#main").append("svg").attr("width", 1600)
               .attr("height", 1000)
               .attr("transform","translate(0,0)")
               .attr("id","svgmulti")
               //scale de répartition sur l'axe x
               cty.xScale = d3.scaleLinear()
               .domain([2000, 2022])
               .range([50,1550]);
           
               cty.yScale = d3.scaleLinear()
               .domain([0, 100])
               .range([1000,20]);

               

                

               // créer un array [{pays:Nom , sdg:[] , goal1:[],... goal17:[]}]
               let indice="sdg"
               cty.arrayData = []
               let current = "A"
               let i = -1
               data.forEach(element => {
                   if (element.country != current)
                   {
                       i=i+1
                       current=element.country
                       cty.arrayData.push([{"pays":current,"sdg":element.sdg_index_score,"goal1":element.goal_1_score,
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
                       cty.arrayData[i].push({"pays":current,"sdg":element.sdg_index_score,"goal1":element.goal_1_score,
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
               .x(d =>cty.xScale(d["date"]) )
               .y(d=> cty.yScale(d["sdg"]))
               console.log(cty.arrayData[0][0])
           
               let paths=svg.selectAll("path")
               .data(cty.arrayData)
               .enter()
               .append("path")
               .attr("id","multipath")
               .attr("fill","none")
               .attr("stroke","gray")
               .attr("stroke-width", 1)
               .attr("d", lineGenerator)
           
               paths.on("mouseover", function (event,d) {
                   d3.select(this)
                   .attr("stroke-width", 2)
                   .attr("stroke","blue")
                   cty.pays=d[0]["pays"]
               })
               .on("mouseout", function (d) {
                   d3.select(this)
                   .attr("stroke","gray")
                   .attr("stroke-width", 1)
                   
               })
           
           
}
function updateMultiLigne(A)
{
               let goal="sdg"
               if(A=="global")
               {
                   goal="sdg"
               }
               else
               {
                   goal="goal"+A.toString()
               }
               console.log(goal)
              
           
               let lineGenerator = d3.line()
               .x(d =>cty.xScale(d["date"]) )
               .y(d=> cty.yScale(d[goal]))
           
               paths=d3.select("#svgmulti").selectAll("path")
               .data(cty.arrayData)
               .transition()
               .duration(1000)
               .attr("d", lineGenerator)
           
              
           
              
           
           
           
}