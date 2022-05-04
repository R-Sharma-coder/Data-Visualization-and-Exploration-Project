var svg = d3.select("body")

var myimage = svg.append('image')
    .attr('xlink:href', 'shape_legends.png')
    .attr('width', 500)
    .attr('height', 500)

myimage.attr('x', 50)