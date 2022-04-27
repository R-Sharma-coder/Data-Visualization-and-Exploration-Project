// https://dev.to/learningmonk/sortable-bar-chart-with-d3-js-k3b
const w = 1000;
const h = 500;

const margins = { top: 50, left: 100, bottom: 100, right: 100 }
const innerWidth = w - margins.left - margins.right;
const innerHeight = h - margins.top - margins.bottom;

const url = "https://raw.githubusercontent.com/Ruchira-Sharma/Test_Repository/main/Financial_Information.csv";

d3.csv(url, function(error, data) {
  
  data.forEach(d => {
    d.Symbol = d.Symbol;
    d.PE_Ratio = +d.PE_Ratio;
  });
  
  // Create a select dropdown
  const mySelection = document.getElementById("companyWiseSelectMe");

  d3.select(mySelection).append("span").append("p").attr("class", "label").text("How should these bars sorted?").style("font-weight", "bold").style("color", "red").style("font-size", "25px");

  const selectItems = ["Alphabetically", "Ascendingly", "Descendingly"];

  // Create a drop down
  d3.select(mySelection)
    .append("span")
    .append("select")
    .attr("id", "selection")
    .attr("name", "tasks")
    .selectAll("option")
    .data(selectItems)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);

  // When the page loads, the chart which sorted alphabetically loads by default
  document.addEventListener("DOMContentLoaded", myChart()); 


  // Chart changes based on drop down selection
  d3.select("#selection").on("change", function() {
    const selectedOption = d3.select(this).node().value;
    if (selectedOption == "Ascendingly") {
      data.sort((a,b) => {
        return d3.ascending(a.PE_Ratio, b.PE_Ratio)
      }) 
    } else if (selectedOption == "Descendingly") {
      data.sort((a,b) => {
        return d3.descending(a.PE_Ratio, b.PE_Ratio)
      })
    } else if (selectedOption == "Alphabetically") {
      data.sort((a,b) => {
        return d3.ascending(a.Symbol, b.Symbol)
      })
    }
    myChart();
  })

  function myChart () {
    // Append SVG to this DIV
    const chartDIV = document.createElement("div");

    // Create scales
    const xScale = d3.scaleBand()
    .domain(data.map((d) => d.Symbol))
    .rangeRound([0, innerWidth])
    .paddingInner(100);

    const yScale = d3.scaleLinear()
      .domain([0,d3.max(data, d => d.PE_Ratio)]).nice()
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom().scale(xScale);

    const yAxis = d3.axisLeft().scale(yScale);
    
    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr('display', 'block')
    .style("opacity", 0);
     
    const svg = d3.select(chartDIV)
      .append("svg")
      .attr("viewBox", [0,0,w,h]);
    
    const mainG = svg
      .append("g")
      .attr("transform", `translate(${margins.left}, ${margins.top})`);
    
    const g = mainG
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", `translate(15,0)`);

    g.append("rect")
      .attr("id", "circleBasicTooltip")
      .attr("class", "bars")
      .attr("x", d => xScale(d.Symbol) - innerWidth/data.length/2)
      .attr("y", d => yScale(d.PE_Ratio))
      .attr("width", innerWidth/data.length- 10)
      .attr("height", (d) => innerHeight - yScale(d.PE_Ratio))
      .attr("fill", d => d.PE_Ratio == d3.max(data, d => d.PE_Ratio) ? "#ffb950" : "#fa5e1f")
      .on("mouseover", function(event,d) {
      div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(event.Company_Name+ "<br/>" + event.PE_Ratio)
         .style("left", (60+xScale(event.Symbol)) + "px")
         .style("top", (h - (innerHeight - yScale(event.PE_Ratio))) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

    mainG
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${innerHeight})`);

    mainG
      .append("g")
      .call(yAxis);

    // This code will redraw charts based on dropdown selection. At any point in time, chartContainer DIV only contains one chart. The charts are recycled.
    const showChart = document.getElementById("chartContainer");
    while (showChart.firstChild) {
      showChart.firstChild.remove();
    }
    showChart.appendChild(chartDIV);

  }

});
// Company Selection END 
// Sectorwise Selection Start
var svg = d3.select("svg"),
    margin = {top: 100, right: 20, bottom: 300, left: 30},
    width = svg.attr("width") - margin.left - margin.right,
    height =  svg.attr("height") - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.25),
    y = d3.scaleLinear().rangeRound([height, 0]);
  
var colours = d3.scaleOrdinal()
    .range(["#6F257F"]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/Ruchira-Sharma/Test_Repository/main/Financial%20Information%20Edited%20Sector%20Wise%20PE%20Ratio.csv", function(error, data) {

    x.domain(data.map(function(d) { return d.Sector; }));
    y.domain([0, 150]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    g.append("g")
      	.attr("class", "axis axis--y")
      	.call(d3.axisLeft(y).ticks(10).tickFormat(function(d) { return d ; }).tickSizeInner([-width]))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("P/E Ratio");

    g.selectAll(".bar")
      	.data(data)
      .enter().append("rect")
        .attr("x", function(d) { return x(d.Sector); })
        .attr("y", function(d) { return y(d.PE_Ratio); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.PE_Ratio); })
        .attr("fill", function(d) { return colours(d.Sector); })
        .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.Sector) + "<br>"  + (d.PE_Ratio));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
    });


// Tool Tip Supposed to be seen for longer?