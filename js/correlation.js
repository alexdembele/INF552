const ctc={
    data:{}
}

function loadDataEducation()
{
    //que pour 2022 ?
    //format {goal:{pays:{name:,annee:}}

    
    d3.csv("data/education.csv").then(function (data) {
        let arr= {}
        console.log(data[1])
        data.forEach(element => {
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["population"]=arr
        loadDataChomage()
        }).catch(function (err) { console.log(err); });

}

function loadDataChomage()
{
    d3.csv("data/chomage.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
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
            arr[element["Country Name"]]={}
            arr[element["Country Name"]]["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[element["Country Name"]][o.toString()]=element[o.toString()]
            }
            
        });
        ctc.data["emission"]=arr
        loadDataGoal()
        }).catch(function (err) { console.log(err); });
}

function loadDataGoal()
{
    console.log(ctc.data)
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
                ctc.
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
        

    let options = ["population","esperanceVie","RNB","surface","PIB","PIBHabitant","energieEqu",
                    "education","emissionCO2","bonheur","chomage","goal1","goal2","goal3","goal4",
                    "goal5","goal6","goal7","goal8","goal9","goal10","goal11","goal12","goal13",
                    "goal14","goal15","goal16","goal17"]


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

}