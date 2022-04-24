var fileName = "https://raw.githubusercontent.com/nirvana1707/DataVisualizationTest/main/FinancialInformation.csv"

d3.csv(fileName, function(row) {
    var dataset = {};
    var sectorNames = new Set();
    dataset["children"] = [];

    for (var i=0; i<row.length; i++){
        var mkt = row[i].MarketCap.trim()
        mkt = mkt.slice(1,mkt.length)
        mkt = mkt.replace(/,/g,"")
        dataset["children"].push({"Name":row[i].CompanyName, "Count":parseInt(mkt),"Sector":row[i].Sector})
        sectorNames.add(row[i].Sector)
    }

    
var sectors = [...sectorNames]
var diameter = 600;
//["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")
    .style("position","relative")				
    .style("opacity", 0)

var color = d3.scaleOrdinal()
    .domain(sectors)
    .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"]);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("body")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    })
    

node.append("title")
    .text(function(d) {
        return d.data.Name + "has a total market capitalization of " + d.data.Count/1000000 + "$Mn";
    });

node.append("circle")
    .attr("r", function(d) {
        //console.log(d.r);
        return d.r;
        //return 300;
    })
    .style("fill", function(d,i) {
        console.log(d.data.Sector + "=>" + color(d.data.Sector))
        return color(d.data.Sector);
    })
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/6;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

// d3.select(self.frameElement)
//     .style("height", diameter + "px");
    
})
