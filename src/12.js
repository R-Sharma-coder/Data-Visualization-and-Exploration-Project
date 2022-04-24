d3.csv("https://raw.githubusercontent.com/nirvana1707/DataVisualizationTest/main/Financial_Information_csv.csv", function(error, dataset) {
  if (error) throw error;

  var cols = ["PE","Beta","Institutional_Holding_perc", "Retail_Holding_perc"]
//   var cols = d3.keys(dataset[0]).filter(function(key) {
//     return key != "CompanyName" && key!= "Symbol" && key!="Sector";
//   });

  console.log(cols)

  d3.selectAll("thead td").data(cols).on("click", function(k) {
    tr.sort(function(a, b) { return b[k] - a[k]; });
  });

  

  var tr = d3.select("tbody").selectAll("tr")
      .data(dataset)
    .enter().append("tr");

  tr.append("th")
      .text(function(d) { return d.CompanyName; });
  //tr.append("header2")
  //    .text(function(d) { return d.Sector; });

  var bar = tr.selectAll("td")
      .data(function(d) { return cols.map(function(k) { return d[k]; }); })
    .enter().append("td").append("svg")   
      .attr("width", 71)
      .attr("height", 12)

  var g=  bar.append("g")
  var rect = g.append("rect")
      .attr("height", 12)
      .attr("width", function(d,i) { 
          console.log(d,i); 
          if (i==1) {
              return d*10;
          }
          return d; })
   
  g.append("text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor","left")
      .text(function(d) {
          return d;
      })
      .style("fill","#000000")

});
