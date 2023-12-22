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

    svg.append("text")
    .attr("id","surligne")
    .text("Pays surligné : France")  
    .style("font-size", "15px")  

    .attr("y",140)
    .attr("stroke","blue")

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
    

    svg.append("text").text("Index").attr("id","change").attr("y",80).attr("x",200)
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

               svg.append("rect")
               .attr("height",1000)
               .attr("width",1600)
               .attr("fill","lime")
               .style("opacity",0.1)
               //scale de répartition sur l'axe x
               cty.xScale = d3.scaleLinear()
               .domain([2000, 2022])
               .range([50,1550]);
           
               cty.yScale = d3.scaleLinear()
               .domain([0, 100])
               .range([950,20]);

               //axe abscisse
               let axeX = d3.axisBottom(cty.xScale)
               let formatAxeX=d3.format(".0f")
               axeX.tickFormat(formatAxeX);
               svg.append("g")
               .attr("transform", "translate(0, 950)")  // Déplacer l'axe au bas du SVG
               .call(axeX);

               //axe ordonnée
               let years=[]
               for(t=2000;t<=2022;t++)
               {
                years.push([{x:t,y:950},{x:t,y:0}])
               }
               let generateurOrdonnee =d3.line()
               .x(d =>cty.xScale(d.x) )  
               .y(d => d.y);

               let axeY = svg.append("g").selectAll("path")
               .data(years)
               .enter()
               .append("path")
               .attr("fill","none")
               .attr("stroke","black")
               .attr("stroke-width", 0.5)
               .style("opacity",1)
               .attr("d", generateurOrdonnee)
               


               

                

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
                   d3.select("#surligne").text("Pays surligné : "+d[0]["pays"])
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
               

              
           
               let lineGenerator = d3.line()
               .x(d =>cty.xScale(d["date"]) )
               .y(d=> cty.yScale(d[goal]))
           
               paths=d3.select("#svgmulti").selectAll("#multipath")
               .data(cty.arrayData)
               .transition()
               .duration(1000)
               .attr("d", lineGenerator)
           
              
           
              
           
           
           
}