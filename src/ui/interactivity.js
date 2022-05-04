var fileName = "https://raw.githubusercontent.com/nirvana1707/DataVisualizationTest/main/FinancialInformation.csv"

d3.csv(fileName, function(row) {
    var format2d = d3.format(".2f")  
    console.log(row)
    var dataset = {};
    var sectorNames = new Set();
    var sectorMap = {}
    dataset["children"] = [];
    
    for (var i=0; i<row.length; i++){
        
        var mkt = row[i].MarketCap.trim()
        mkt = mkt.slice(1,mkt.length)
        mkt = mkt.replace(/,/g,"")
        dataset["children"].push({"Name":row[i].CompanyName, "Count":parseInt(mkt),"Sector":row[i].Sector, "Symbol":row[i].Symbol})
        sectorNames.add(row[i].Sector)
        sectorMap[row[i].Symbol] = row[i].SectorSymbol
    }
    console.log()
    var dataset1 = [];
    var dataset2 = [];
    var yearwise = {};
    var sectorwise = {};
    var sectorwiseAvg = {};
    var yearList = ["2017","2018","2019","2020","2021","2022"]
    var sectorSymbol = ["B","C","H","T","O"]
    // initializing sectorwise 
    for (var i=0;i<5;i++){
        sectorwise[sectorSymbol[i]] = {}
        sectorwiseAvg[sectorSymbol[i]] = {}
        for (var j=0;j<6;j++){
            sectorwise[sectorSymbol[i]][yearList[j]]={}
            sectorwiseAvg[sectorSymbol[i]][yearList[j]]=0 
            sectorwise[sectorSymbol[i]][yearList[j]]["count"]=0
            sectorwise[sectorSymbol[i]][yearList[j]]["sum"]=0
        }
    }
    for (var i=0;i<row.length;i++){
        for (var j=0;j<6;j++){
            //console.log("hi")
            //console.log(i+","+j)
            //console.log(sectorwise[row[i].SectorSymbol[i]][yearList[j]])
            sectorwise[row[i].SectorSymbol][yearList[j]]["count"]+=1
            sectorwise[row[i].SectorSymbol][yearList[j]]["sum"]+= +row[i][yearList[j]]

        }
        //console.log(sectorwise)
        
    }
    for (var i=0;i<row.length;i++){
        for (var j=0;j<6;j++){
            //console.log("hi")
            //console.log(i+","+j)
            //console.log(sectorwise[row[i].SectorSymbol[i]][yearList[j]])
            refKey = sectorwise[row[i].SectorSymbol][yearList[j]]
            sectorwiseAvg[row[i].SectorSymbol][yearList[j]] = refKey["sum"]/refKey["count"]

        }
        
    }
    console.log(sectorwiseAvg)
    // initialization
    // company level and sector level
    yearwiseSector = {}
    for (var i=0; i<6;i++){
        yearwise[yearList[i]]={}
        yearwiseSector[yearList[i]] = {}
    }
    console.log(yearwiseSector)
    

    var listSymbols = [];
    // Symbol level
    for (var i=0; i<row.length; i++) {
        listSymbols.push(row[i].Symbol)
        for (var j=0; j<6; j++) {
            yearwise[yearList[j]][row[i].Symbol] = row[i][yearList[j]]
        }
    }
    // Sector Symbol level
    console.log("sector")
    for (var i=0; i<5;i++) {
        for (var j=0; j<6; j++){
            //console.log("hi")
            //console.log(sectorwiseAvg[listSymbols[i]])
            yearwiseSector[yearList[j]][sectorSymbol[i]] = sectorwiseAvg[sectorSymbol[i]][yearList[j]]
        }
    }
    console.log(yearwiseSector)
    
    for (var j=0; j<6; j++) { 
        tempDict = {}
        tempDict['time'] = yearList[j]
        for (var [k,v] of Object.entries(yearwise[yearList[j]])) {
            tempDict[k]=v
        }
        dataset1.push(tempDict)

    }
    console.log(dataset1)
    for (var j=0; j<6; j++) { 
        tempDict = {}
        tempDict['time'] = yearList[j]
        for (var [k,v] of Object.entries(yearwiseSector[yearList[j]])) {
            tempDict[k]=v
        }
        dataset2.push(tempDict)

    }
    console.log(dataset2)
    


    
var sectors = [...sectorNames]
var diameter = 400;
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
//svg1
// Add X axis --> it is a date format
var margin1 = {top: 10, right: 30, bottom: 30, left: 30},
    width1 = 600 - margin1.left - margin1.right,
    height1 = 400 - margin1.top - margin1.bottom;

  data1 = dataset1
  data2 = dataset2
//sectorMap = {"AAPL":"Sector1","MSFT":"Sector2", "V":"Sector3"}
console.log(sectorMap)
colorMap = {"C":"#1f77b4", "H":"#ff7f0e", "B": "#2ca02c", "T":"#9467bd","O":"#d62728"}

var svg1 = d3.select("body")
.append("svg")
    .attr("width", width1 + margin1.left + margin1.right)
    .attr("height", height1 + margin1.top + margin1.bottom)
.append("g")
    .attr("transform",
          "translate(" + margin1.left + "," + margin1.top + ")");
var x1 = d3.scaleLinear()
    .domain([2017,2022])
    .range([ 0, width1 ])
    
svg1.append("g")
    .attr("transform", "translate(0," + height1 + ")")
    .call(d3.axisBottom(x1).tickFormat(d3.format('.0f')).ticks(6));

// Add Y axis
var y1 = d3.scaleLinear()
.domain( [0,160])
.range([ height1, 0 ]);
svg1.append("g")
.call(d3.axisLeft(y1));

// Initialize line with group a
var line1 = svg1
.append('g')
.append("path")
  .datum(data1)
  .attr("d", d3.line()
    .x(function(d) { return x1(+d.time) })
    .y(function(d) { return y1(+d.V) })
  )
  .attr("stroke", function(d){ 
      return "black"
      //return myColor("V") 
    })
  .style("stroke-width", 4)
  .style("fill", "none")


var line1Text = svg1
.append('g')
.selectAll("text")
.data(data1)
.enter()
.append("text")
.attr("class","line1Text")
.text(function(d) { 
    
    return format2d(d.V)+"Mn"
})
.attr("x",function(d) {return x1(+d.time)})
.attr("y",function(d) {return y1(+d.V)-5})  
.style("font-size","10")

var line2Text = svg1
.append('g')
.selectAll("text")
.data(data2)
.enter()
.append("text")
.attr("class","line2Text")
.text(function(d) { 
    
    return format2d(d.C)+"Mn"
})
.attr("x",function(d) {return x1(+d.time)})
.attr("y",function(d) {return y1(+d.C)+5})  
.style("font-size","10")

  var line2 = svg1
  .append('g')
  .append("path")
    .datum(data2)
    .attr("d", d3.line()
      .x(function(d) { return x1(+d.time) })
      .y(function(d) { return y1(+d.C) })
    )
    .attr("stroke", function(d){ 
        return colorMap["C"] 
      })
    .style("stroke-width", 4)
    .style("fill", "none")




function update(selectedValue) {
    var dataFilter1 = data1.map(function(d){return {time: d.time, value:d[selectedValue]} })
    var selectedSector = sectorMap[selectedValue]
    var dataFilter2 = data2.map(function(d){return {time: d.time, value:d[selectedSector]} })
    var selectedColor = colorMap[selectedSector]
    console.log(dataFilter1)

    // Give these new data to update line
    line1
        .datum(dataFilter1)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
        .x(function(d) { return x1(+d.time) })
        .y(function(d) { return y1(+d.value) })
        )
        .attr("stroke", function(d) { 
            return "black"
            // return myColor(selectedGroup) 
        })
    line1Text
        .data(dataFilter1)
        .transition()
        .duration(1000)
        .text(function(d) { 
    
            return format2d(d.value)+"Mn"
        })
        .attr("x",function(d) {            
            return x1(+d.time)})
        .attr("y",function(d) {return y1(+d.value)-5}) 

    line2
        .datum(dataFilter2)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
        .x(function(d) { return x1(+d.time) })
        .y(function(d) { return y1(+d.value) })
        )
        .attr("stroke", function(d) { 
            return selectedColor
            // return myColor(selectedGroup) 
        })
    line2Text
        .data(dataFilter2)
        .transition()
        .duration(1000)
        .text(function(d) { 
    
            return format2d(d.value)+"Mn"
        })
        .attr("x",function(d) {            
            return x1(+d.time)})
        .attr("y",function(d) {return y1(+d.value)+5}) 
    
}
    


//

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
        return "Company Name: "+d.data.Name+" Market Cap: "+format2d(d.data.Count/1000000)+"Mn$ (please click on the node)";
    });

node.append("circle")
    .attr("r", function(d) {
        //console.log(d.r);
        return d.r;
        //return 300;
    })
    .style("fill", function(d,i) {
        //console.log(d.data.Sector + "=>" + color(d.data.Sector))
        return color(d.data.Sector);
    })
    //.on("mouseover", showTooltip )
    //.on("mousemove", moveTooltip )
    //.on("mouseleave", hideTooltip )

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/7;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return format2d(d.data.Count/1000000) +"Mn $";
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/7;
    })
    .attr("fill", "white");
 d3.selectAll(".node").on("click", function(d){
     var selectedOption = d3.select(this)._groups[0][0]
     //https://stackoverflow.com/questions/10337640/how-to-access-the-dom-element-that-correlates-to-a-d3-svg-object
     //console.log(Object.getOwnPropertyNames(selectedOption))
     console.log(selectedOption.__data__["data"])
     update(selectedOption.__data__["data"]["Symbol"])
     //"Name", "Count", "Sector"
 })

// d3.select(self.frameElement)
//     .style("height", diameter + "px");
    
})
