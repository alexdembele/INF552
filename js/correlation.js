const ctc={
    data:{},
    attribut1:"population",
    attribut2:"population",
    maxPopulation:3412175000,
    maxVie:100,
    maxRNB:80000,
    maxSurface:16376870,
    maxPIBHab:81763,
    maxEnerg:19903,
    maxEdu:96,
    maxEmi:10944686,
    maxCho:30,
    w:200,
    




}

function loadDataEducation()
{
    //que pour 2022 ?
    //format {goal:{pays:{name:,annee:}}

    
    d3.csv("data/education.csv").then(function (data) {
        let arr= {}
        ctc.Codes=[]
        data.forEach(element => {
            ctc.Codes.push(element["Country Code"])
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["education"]=arr
        loadDataChomage()
        }).catch(function (err) { console.log(err); });

}

function loadDataChomage()
{
    d3.csv("data/chomage.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["chomage"]=arr
        loadDataPopulation()
        }).catch(function (err) { console.log(err); });
}

function loadDataPopulation()
{
    d3.csv("data/population.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["population"]=arr
        loadDataVie()
        }).catch(function (err) { console.log(err); });
}

function loadDataVie()
{
    d3.csv("data/esperanceVie.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["esperanceVie"]=arr
        loadDataRNB()
        }).catch(function (err) { console.log(err); });
}

function loadDataRNB()
{
    d3.csv("data/RNB.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["RNB"]=arr
        loadDataSurface()
        }).catch(function (err) { console.log(err); });
}
function loadDataSurface()
{
    d3.csv("data/surface.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["surface"]=arr
        loadDataPIB()
        }).catch(function (err) { console.log(err); });
}
function loadDataPIB()
{
    d3.csv("data/PIB.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["PIB"]=arr
        loadDataPIBHabitant()
        }).catch(function (err) { console.log(err); });
}

function loadDataPIBHabitant()
{
    d3.csv("data/PIBHabitant.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["PIBHabitant"]=arr
        loadDataEnergie()
        }).catch(function (err) { console.log(err); });
}
function loadDataEnergie()
{
    d3.csv("data/energieEqu.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["energie"]=arr
        loadDataCO2()
        }).catch(function (err) { console.log(err); });
}
function loadDataCO2()
{
    d3.csv("data/emissionCO2.csv").then(function (data) {
        let arr= {}

        data.forEach(element => {
            arr[element["Country Code"]]={}
            arr[element["Country Code"]]["name"]=element["Country Code"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Code"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["emission"]=arr
        loadDataGoal()
        }).catch(function (err) { console.log(err); });
}

function loadDataGoal()
{
    console.log(ctc.data)

    // A continuer si on a le temps
    /*d3.csv("data/sdg_index_2000-2022.csv").then(function (data) {
        let ARR = []
        for(p=0;p<18;p++)
        {
            ARR.push({})
        }


        
        let current = "A"
        data.forEach(element => {
            let annee = element.year
            if (element.country != current)
            {
                current=element.country
                for(p=0;p<18;p++)
                {
                    ARR[p]["name"] = current
                    
                }



            }
            if(annee="2022")
            {
                ctc.data[]
            }
            
            
        });
        
        }).catch(function (err) { console.log(err); });*/
        CreateCorrelation();

}



function CreateCorrelation()
{
    console.log("Yousk2")
    let rec=d3.select("#correlateur").append("svg")
    .attr("width", 1600)
    .attr("height", 540)

    rec.append("rect")
    .attr("width", 1600)
    .attr("height", 540)
    .attr("fill", "#DF98FC")
    .style("opacity", 0.3);

    rec.append("rect")
    .attr("width", 1600)
    .attr("height", 30)
    .attr("fill", "#DF98FC")
    .style("opacity", 0.6);

  rec
    .append("text")
    .attr("x",5)
    .attr("y", 20)
    .text("Chercheur de correlation")
    .style("font-size", "24px")
    .style("font-weight", "bold");

    let foreignObject = rec.append("foreignObject")
    .attr("x", 10)  // Position X
    .attr("y", 80)  // Position Y
    .attr("width", 600)  // Largeur
    .attr("height", 50);  // Hauteur

    // Ajouter l'élément select à l'intérieur de foreignObject
    let selecteur1 = foreignObject.append("xhtml:select")
        .attr("id", "monSelecteur1")

    let selecteur2 = foreignObject.append("xhtml:select")
        .attr("id", "monSelecteur2")
        

    let options = ["population","esperanceVie","RNB","surface","PIBHabitant","energieEqu",
                    "education","emissionCO2","chomage"]


    selecteur1.selectAll("myOptions")
    .data(options)
    .enter()
    .append("option")
    .text(function (d) {return d;})
    .attr("value", function (d) {return d;});

    selecteur2.selectAll("myOptions")
    .data(options)
    .enter()
    .append("option")
    .text(function (d) {return d;})
    .attr("value", function (d) {return d;});

    rec.append("rect")
    .attr("width", 111)
    .attr("height", 20)
    .attr("fill", "#F932D8")
    .style("opacity", 0.6)
    .attr("x",10)
    .attr("y",60)
    rec.append("rect")
    .attr("width", 111)
    .attr("height", 20)
    .attr("fill", "#F932D8")
    .style("opacity", 0.6)
    .attr("x",120)
    .attr("y",60)


    let label1 = rec.append("text")
    .attr("x",30)
    .attr("y",75)
    .text("Abscisse")
    let label2 = rec.append("text")
    .attr("x",140)
    .attr("y",75)
    .text("Ordonnee")

    //creation du graphique
    let graph=rec.append("g")
    .attr("id","graphCorr")
    .attr("transform","translate(400,40)")

    selecteur1.on("change", function () { 
        
        let A =d3.select(this).property("value");
        ctc.attribut1=A
        updateCorrelation()
           });
    selecteur2.on("change", function () { 
        
        let A =d3.select(this).property("value");
        ctc.attribut2=A
        updateCorrelation()
               });
    
    let circles = graph.selectAll("circles")
               .data(ctc.Codes)
               .enter()
               .append("circle")
               .attr("id","cercle")
               .attr("r",5)
               .attr("cx",d =>xPos(ctc.data[ctc.attribut1][d][ctx.date]))
               .attr("cy",d =>yPos(ctc.data[ctc.attribut2][d][ctx.date]))



}

function updateCorrelation()
{
    let circles=d3.select("#graphCorr").selectAll("#cercle")
    .transition()
    .duration(1000)
    .attr("cx",d =>xPos(ctc.data[ctc.attribut1][d][ctx.date]))
    .attr("cy",d=>yPos(ctc.data[ctc.attribut2][d][ctx.date]))
    

}
function colorCircle()
{

}

function xPos(x)
{
    if (ctc.attribut1=="population")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxPopulation])
        .range([0,ctc.w]);
    }
    if (ctc.attribut1=="chomage")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxCho])
        .range([0,ctc.w]);

    }
    if (ctc.attribut1=="esperanceVie")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxVie])
        .range([0,ctc.w]);

    }
    if (ctc.attribut1=="education")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxEdu])
        .range([0,ctc.w]);

    }
    if (ctc.attribut1=="RNB")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxRNB])
        .range([0,ctc.w]);

    }
    if (ctc.attribut1=="PIBHabitant")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxPIBHab])
        .range([0,ctc.w]);
    }
    if (ctc.attribut1=="surface")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxSurface])
        .range([0,ctc.w]);

    }
    if (ctc.attribut1=="energie")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxEnerg])
        .range([0,ctc.w]);
    }
    if (ctc.attribut1=="emission")
    {
        ctc.xScale=d3.scaleLinear()
        .domain([0, ctc.maxEmi])
        .range([0,ctc.w]);

    }
    
    console.log(x,ctc.xScale(x))
    return ctc.xScale(x)
}

function yPos(y)
{
    if (ctc.attribut1=="population")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxPopulation])
        .range([-ctc.w,0]);
    }
    if (ctc.attribut1=="chomage")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxCho])
        .range([-ctc.w,0]);

    }
    if (ctc.attribut1=="esperanceVie")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxVie])
        .range([-ctc.w,0]);

    }
    if (ctc.attribut1=="education")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxEdu])
        .range([-ctc.w,0]);

    }
    if (ctc.attribut1=="RNB")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxRNB])
        .range([-ctc.w,0]);

    }
    if (ctc.attribut1=="PIBHabitant")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxPIBHab])
        .range([-ctc.w,0]);
    }
    if (ctc.attribut1=="surface")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxSurface])
        .range([-ctc.w,0]);

    }
    if (ctc.attribut1=="energie")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxEnerg])
        .range([-ctc.w,0]);
    }
    if (ctc.attribut1=="emission")
    {
        ctc.yScale=d3.scaleLinear()
        .domain([0, ctc.maxEmi])
        .range([-ctc.w,0]);

    }
    

    return ctc.xScale(y)

}

