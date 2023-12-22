

function loadDataCorr()
{

}

function CreateCorrelation()
{
    debug()
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
    .attr("y", 40)  // Position Y
    .attr("width", 150)  // Largeur
    .attr("height", 30);  // Hauteur

    // Ajouter l'élément select à l'intérieur de foreignObject
    let selecteur1 = foreignObject.append("xhtml:select")
        .attr("id", "monSelecteur1")

    let selecteur2 = foreignObject.append("xhtml:select")
        .attr("id", "monSelecteur2")
        .attr("x",100)

    let options = []

}