//  pie.html
        var svg = d3.select('#Pie_Chart').select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = 200;
        // Step 1        
        url = "https://raw.githubusercontent.com/Ruchira-Sharma/Data-Visualization-and-Exploration-Project/main/dataset/FinancialInformation.csv?token=GHSAT0AAAAAABRDW5A55PZKRMEG4RFBRCWGYTJTGHQ";
        d3.csv(url, function(csv_data) {
          var data = d3.nest()
        .key(function(d) {  return d.Sector;})
        .rollup(function(d) { 
        
        return d3.sum(d, function(g) {
          //console.log(g.MarketCap)
          //return g.MarketCap;
          console.log(g)
          var len = g.MarketCap.length 
//parseInt(g.MarketCap.trim().slice(1,len).replace(/,/g,""))
          return parseInt(g.MarketCap.trim().replace("$","").replace(/,/g,"")); 
        
        });
        }).entries(csv_data);
        
        // Reference https://stackoverflow.com/questions/70603481/how-do-i-split-labels-for-my-donut-chart-to-multiple-lines-using-d3-js
      function lineBreak(text, width) {
        text.each(function () {
          var el = d3.select(this);
          let words = el.text().split(' ');
          let wordsFormatted = [];

          let string = '';
          for (let i = 0; i < words.length; i++) {
            if (words[i].length + string.length <= width) {
              string = string + words[i] + ' ';
            }
            else {
              wordsFormatted.push(string);
              string = words[i] + ' ';
            }
          }
          wordsFormatted.push(string);

          el.text('');
          for (var i = 0; i < wordsFormatted.length; i++) {
            var tspan = el.append('tspan').text(wordsFormatted[i]);
            if (i > 0)
              tspan.attr('x', 0).attr('dy', '15');
          }
        });
      }

      
        /*var data = [{name: "Alex", share: 20.70}, 
                    {name: "Shelly", share: 30.92},
                    {name: "Clark", share: 15.42},
                    {name: "Matt", share: 13.65},
                    {name: "Jolene", share: 19.31}];
        */

        var g = svg.append("g")
                   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

     // Step 4
        var ordScale = d3.scaleOrdinal()
                        	.domain(data)
                        	.range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72']);
        var fontScale = d3.scaleOrdinal()
                          .domain(data)
                          .range([10,15,20,25,30]);

        // Step 5
        var pie = d3.pie().value(function(d) { 
                return d.value; 
            });

            var arcHover = d3.arc()
                          .innerRadius(0)
                          .outerRadius(220);
        var arc = g.selectAll("arc")
                   .data(pie(data))
                   .enter();
                  
                   


        // Step 6
        var path = d3.arc()
                     .outerRadius(radius)
                     .innerRadius(0);

        arc.append("path")
           .attr("d", path)
           .attr("fill", function(d) {  return ordScale(d.data.key); })
          .on("mouseover", function(d) {
            console.log("hi");
        d3.select(this).transition()
          .duration(1000)
          .attr("d", arcHover);
      });

           

        // Step 7
        var label = d3.arc()
                      .outerRadius(radius)
                      .innerRadius(0);
        
            
        arc.append("text")
           .attr("transform", function(d) { 
             if (d.data.key=="Telecommunication and Semiconductor Industry") {
               //posnAngle = ((d.startAngle + d.endAngle)/2)*(180/Math.PI)
               changedVal = label.centroid(d)
               changedVal[0] = label.centroid(d)[0]
               changedVal[1] = label.centroid(d)[1]-30
               return "translate(" + changedVal + ") rotate(80)";
             }
             else if (d.data.key=="Banking Services") {
              return "translate(" + label.centroid(d) + ") rotate(60)";
             }

             return "translate(" + label.centroid(d) + ")"; 
            })
           .text(function(d) { return d.data.key; })
           .style("font-size",15)
          
           .attr("text-anchor", "middle")
           .call(lineBreak, 25);
 });
          


//  Tree Map


  var div = d3.select("#Tree_Chart")	
  .attr("class", "tooltip")
  .attr("position","relative")				
  .style("opacity", 0);

var diameter = 500, //max size of the bubbles
  format   = d3.format(",d"),
  color    = d3.scaleOrdinal(d3.schemeCategory10);
  //more color options: https://github.com/d3/d3-scale-chromatic

var bubble = d3.pack()
  .size([diameter, diameter])
  .padding(1.5);

var svg2 = d3.select("#Tree_Chart")
  .append("svg")
  .attr("width", diameter)
  .attr("height", diameter)
  .attr("class", "bubble");
  url = "https://raw.githubusercontent.com/Ruchira-Sharma/Data-Visualization-and-Exploration-Project/main/dataset/FinancialInformation.csv?token=GHSAT0AAAAAABRDW5A5UQ3SSKJIDVCLRCTIYTJTCIQ";
d3.csv(url, function(data,error){

var data1 = d3.nest()
      .key(function(d) {  return d.CompanyName;})
      .rollup(function(d) { 
      
      return d3.sum(d, function(g) {
        //console.log(g.MarketCap)
        return g.MarketCap; });
      }).entries(data);
      console.log(data);

  //convert numerical values from strings to numbers
  data = data.map(function(d){ d.value = +d["Employees"]; return d; });


  
  //Sets up a hierarchy of data object
  var root = d3.hierarchy({children:data})
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.value - a.value; });

    d3.treemap()
  .size([490,510])
  .padding(5)
  (root)

console.log(root.leaves())
// use this information to add rectangles:
svg2
  .selectAll("rect")
  .data(root.leaves())
  .enter()
  .append("rect")
    .attr('x', function (d) { return d.x0; })
    .attr('y', function (d) { return d.y0; })
    .attr('width', function (d) { return d.x1 - d.x0; })
    .attr('height', function (d) { return d.y1 - d.y0; })
    .style("stroke", "black")
    .style("fill", "#69b3a2")
    .on("mouseover", function(d) {		
          div.transition()		
              .duration(200)		
              .style("opacity", .9);		
          div	.html(d.data["Symbol"] + "<br/>"  + d.data["CompanyName"])	
              .style("left", (d.x0) + "px")		
              .style("top", (d.y0) + "px");	
              //d3.event.pageY
          })					
    .on("mouseout", function(d) {		
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
      })

    .append("title",function(d) {
      //console.log(d.data["Symbol"]);
      return d.data["Symbol"]; });
    
    
//word

function fontSize(d,i) {
var size = d.dx/5;
var words = d.data.split(' ');
var word = words[0];
var width = d.dx;
var height = d.dy;
var length = 0;
d3.select(this).style("font-size", size + "px").text(word);
while(((this.getBBox().width >= width) || (this.getBBox().height >= height)) && (size > 12))
{
size--;
d3.select(this).style("font-size", size + "px");
this.firstChild.data = word;
}
}

// and to add the text labels
svg2
  .selectAll("text")
  .data(root.leaves())
  .enter()
  .append("text")
    .attr("x", function(d){ return d.x0+14})    // +10 to adjust position (more right)
    .attr("y", function(d){ return d.y0+10})    // +20 to adjust position (lower)
    .text(function(d) {
      console.log(d.data["Symbol"]);
      return d.data["Symbol"]; })
    .attr("font-size", "10px")
    .attr("fill", "Black")
    .attr("text-anchor", "middle") // set anchor y justification
    .call(wrap,15)

    function wrap(text, width) {
  text.each(function() {
      var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0, //<-- 0!
      lineHeight = 1.2, // ems
      x = text.attr("x"), //<-- include the x!
      y = text.attr("y"),
      dy = text.attr("dy") ? text.attr("dy") : 0; //<-- null check
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
      }
  });
    }
});
