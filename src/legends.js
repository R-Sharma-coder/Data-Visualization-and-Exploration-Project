var svg = d3.select("body")
  .append("svg")
    .attr("width", 260)
    .attr("height", 120)
  .append("g")
// Color Legends
svg.append("rect").attr("x",0).attr("y",10).attr("width", 15).attr("height",15).style("fill", "#1f77b4")
svg.append("text").attr("x", 20).attr("y", 20).text("Computer & Software").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",30).attr("width", 15).attr("height",15).style("fill", "#ff7f0e")
svg.append("text").attr("x", 20).attr("y", 40).text("Housing, Healthcare, Food & Drugs").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",50).attr("width", 15).attr("height",15).style("fill", "#2ca02c")
svg.append("text").attr("x", 20).attr("y", 60).text("Banking Services").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",70).attr("width", 15).attr("height",15).style("fill", "#9467bd")
svg.append("text").attr("x", 20).attr("y", 80).text("Telecommunication & Service Industry").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("rect").attr("x",0).attr("y",90).attr("width", 15).attr("height",15).style("fill", "#d62728")
svg.append("text").attr("x", 20).attr("y", 100).text("Others").style("font-size", "15px").attr("alignment-baseline","middle")

// Shape Legends

// Gradient Legends

//.domain(sectors)
//.range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"]