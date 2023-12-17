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
}