var svg = d3.select("body")
  .append("svg")
    //.attr("width", 150)
    //.attr("height", 140)
    .attr("width",150)
    .attr("height",130)
  .append("g")
// Color Legends
svg.append("rect").attr("x",0).attr("y",10).attr("width", 15).attr("height",15).style("fill", "#1f77b4")
svg.append("text").attr("x", 20).attr("y", 20).text("Computer & Software").style("font-size", "8px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",30).attr("width", 15).attr("height",15).style("fill", "#ff7f0e")
svg.append("text").attr("x", 20).attr("y", 40).text("Housing, Healthcare, Food & Drugs").style("font-size", "8px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",50).attr("width", 15).attr("height",15).style("fill", "#2ca02c")
svg.append("text").attr("x", 20).attr("y", 60).text("Banking Services").style("font-size", "8px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",70).attr("width", 15).attr("height",15).style("fill", "#9467bd")
svg.append("text").attr("x", 20).attr("y", 80).text("Telecommunication & Service Industry").style("font-size", "8px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",90).attr("width", 15).attr("height",15).style("fill", "#d62728")
svg.append("text").attr("x", 20).attr("y", 100).text("Others").style("font-size", "8px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",110).attr("width", 15).attr("height",15).style("fill", "black")
svg.append("text").attr("x", 20).attr("y", 120).text("Selected Company from Bubble plot").style("font-size", "8px").attr("alignment-baseline","middle")

// Shape Legends
// var svg1 = d3.select("body")
//   .append("svg")
//     .attr("width", 600)
//     .attr("height", 400)

// // The scale you use for bubble size
// var size = d3.scaleSqrt()
//   .domain([1, 100])  // What's in the data, let's say it is percentage
//   .range([1, 100])  // Size in pixel

// // Add legend: circles
// var valuesToShow = ["10", "50", "100"]
// var xCircle = 230
// var xLabel = 380
// var yCircle = 330
// svg1
//   .selectAll("legend")
//   .data(valuesToShow)
//   .enter()
//   .append("circle")
//     .attr("cx", xCircle)
//     .attr("cy", function(d){ return yCircle - size(d) } )
//     .attr("r", function(d){ return size(d) })
//     .style("fill", "none")
//     .attr("stroke", "black")

// Add legend: segments
// svg1
//   .selectAll("legend")
//   .data(valuesToShow)
//   .enter()
//   .append("line")
//     .attr('x1', function(d){ return xCircle + size(d) } )
//     .attr('x2', xLabel)
//     .attr('y1', function(d){ return yCircle - size(d) } )
//     .attr('y2', function(d){ return yCircle - size(d) } )
//     .attr('stroke', 'black')
//     .style('stroke-dasharray', ('2,2'))

// // Add legend: labels
// svg1
//   .selectAll("legend")
//   .data(valuesToShow)
//   .enter()
//   .append("text")
//     .attr('x', xLabel)
//     .attr('y', function(d){ return yCircle - size(d) } )
//     .text( function(d){ 
//       if (d=="10") {
//         return "30000 Mn$" 
//       }
//       else if (d=="50") {
//         return "165000 Mn$" 
//       }
//       return "400000 Mn$" 
//     } )
//     .style("font-size", 10)
//     .attr('alignment-baseline', 'middle')