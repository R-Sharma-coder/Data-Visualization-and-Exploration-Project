var svg = d3.select("svg"),
    margin = {top: 100, right: 20, bottom: 300, left: 30},
    width = svg.attr("width") - margin.left - margin.right,
    height =  svg.attr("height") - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
    y = d3.scaleLinear().rangeRound([height, 0]);
  
var colours = d3.scaleOrdinal()
    .range(["#6F257F"]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Financial_Information.csv", function(error, data) {

    x.domain(data.map(function(d) { return d.Company_Name; }));
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
        .attr("x", function(d) { return x(d.Company_Name); })
        .attr("y", function(d) { return y(d.PE_Ratio); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.PE_Ratio); })
        .attr("fill", function(d) { return colours(d.Company_Name); })
        .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.Company_Name) + "<br>"  + (d.PE_Ratio));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
    });

