const ctc={
    data:{}
}

function loadDataEducation()
{
    //que pour 2022 ?
    //format {goal:{pays:{name:,annee:}}

    
    d3.csv("data/education.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[o.toString()]=element[o.toString()]
            }
            
        });
        data["population"]=arr
        loadDataChomage()
        }).catch(function (err) { console.log(err); });

}

function loadDataChomage()
{
    d3.csv("data/chomage.csv").then(function (data) {
        let arr= {}
        data.forEach(element => {
            arr["name"]=element["Country Name"]
            for(o=2000;o<=2022;o++)
            {
                arr[o.toString()]=element[o.toString()]
            }
            
        });
        data["chomage"]=arr
        loadDataChomage()
        }).catch(function (err) { console.log(err); });
}

function CreateCorrelation()
{
    console.log("Yousk2")
    loadDataEducation()
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
                    "goal14","goal15","goal16","goal17","global"]


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