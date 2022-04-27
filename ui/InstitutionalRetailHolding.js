// set the dimensions and margins of the graph
var margin = {top: 10, right: 60, bottom: 60, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/nirvana1707/DataVisualizationTest/main/FinancialInformation.csv", function(data) {

var sectorNames = new Set();
  for (var i=0; i<data.length; i++){
      sectorNames.add(data[i].Sector)
  }  
var sectors = [...sectorNames]
//["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]

var color = d3.scaleOrdinal()
  .domain(sectors)
  .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"]);


// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")
    .style("position","relative")				
    .style("opacity", 0)
    //.style("max-width","200px")

    


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 70])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("path")
    .attr("class","point")
    .attr("d", d3.symbol().type(d3.symbolTriangle))
    .style("fill", function(d) { return color(d.Sector)})
    .attr("transform", function(d) { return "translate("+x(d.Retail_Holding_perc)+","+y(d.Institutional_Holding_perc)+")"})
    .on("mouseover", function(d) {		
      div.transition()		
          .duration(200)		
          .style("opacity", .9);		
      div	.html(d.CompanyName + " belongs to "+ d.Sector + " sector"+"<br/>" +"with "+d.Institutional_Holding_perc+"% as Institutional holding and " + d.Retail_Holding_perc+"% as Retail holding")	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY-400) + "px")
          .style("font-size","14px")
          .style("background-color","#FFFFFF");
      })					
  .on("mouseout", function(d) {		
      div.transition()		
          .duration(500)		
          .style("opacity", 0)
          .style("background-color","transparent");	
  });
  
  svg.append('g')
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("class","point labels")
    .text(function(d) { 
      if (d.Institutional_Holding_perc<=85 && d.Institutional_Holding_perc>=55 ) {
        return ""
      }
      return d.Symbol
    })
    .attr("x",function(d,i) {
      return 5+x(d.Retail_Holding_perc)
      })
    .attr("y",function(d) {return y(d.Institutional_Holding_perc)})
    .style("font-size",10)
  

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width/2+margin.left)
    .attr("y", height+margin.bottom*0.6)
    .text("Retail Holding %");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -height/2)
    .attr("y", -margin.left/2)
    .attr("transform", "rotate(-90)")
    .text("Institutional Holding %");

    

    
})