function barchart() {
    var margin = {
        top: 30,
        right: 50,
        bottom: 75,
        left: 120
    },
        width = parseInt(d3.select('#avg-retweet-chart').style('width'), 10) - margin.right - margin.left;
        height = width / 16 * 5; 



    var svg = d3.select("#avg-retweet-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dataset = [
        {
            "Type": "False Tweet",
            "Average": 4.45
        },
        {
            "Type": "Non-Rumor Tweet",
            "Average": 0.6
        },
    ];


    var y = d3.scaleBand()
        .domain(dataset.map(d => d.Type))
        .rangeRound([0, height])
        .padding(0.1)
    var x = d3.scaleLinear([0, d3.max(dataset, function(d) { return d.Average; })], [0, width]);

    var bandwidth = d3.scaleBand().domain([dataset.map(function(d) { return d.Type } )]).range([0, width]).bandwidth();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = d3.axisBottom(x)
    var yAxis = d3.axisLeft(y)


    svg.selectAll("rect")
        .data(dataset)
        .enter().append("rect")
        .attr("class","dbar")
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.Type); })
        .attr("x", 0) // function(d) { return 0 //x(d.Average); })
        .attr("value", function(d){return d.Type;})
        .attr("width", function(d) { return x(d.Average); })
        .style("fill", function(d) { return color(d.Type); });

    svg.append("g")
        .style("font", "14px roboto")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)


    svg.append("g")
        .style("font", "14px roboto")
        .attr("class", "y axis")
        .call(yAxis)

    svg.append("text")
        .style("font", "14px roboto")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom / 2)
        .text("Average Time for First Retweet (minutes)");
}

barchart();
