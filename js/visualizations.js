// MINIMUM AVERAGE RETWEET CHART

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



//TYPES OF RETWEETERS

function packed_pie_chart(filename){

    var data = d3.csvParse(await FileAttachment("sample2.csv").text(), ({UserID, T, F, NR, U, value}) => ({UserID: UserID, T: +T, F: +F, NR: +NR, U: +U, value: +value}))
    var data2 = d3.csvParse(await FileAttachment("sample2.csv").text(), ({UserID, T, F, NR, U, value}) => ({UserID: UserID, T: +T, F: +F, NR: +NR, U: +U, value: +value}))
  
    var size = d3.min([document.documentElement.clientHeight*0.9,document.documentElement.clientWidth*0.9])
  
    var dimensions = ( {
        width: size,
        height: size,
        margin: {
            top: 10,
            right: 10,
            left: 50,
            bottom: 50,
        }
    })
  
    var color = d3.scaleOrdinal(['#28d148', '#1f77b4', '#ff7f0e', '#d82825' ])
    var groupByID = d3.group(data, d => d.UserID)
    var reduceFn = data => d3.sum(data, d => d["T"] + d["F"] + d["NR"] + d["U"])
    var rollupData = d3.rollup(data, reduceFn, d => d.UserID)
    var childrenAccessorFn = ([ key, value ]) => value.size && Array.from(value)
    
    var hierarchyData = d3.hierarchy([null, rollupData], childrenAccessorFn)
        .sum(([key, value]) => value)
    
    var pack = data => d3.pack()
        .size([dimensions.width - 2, dimensions.height - 2])
        .padding(3)
    (hierarchyData)
    
    
    const root = pack(data);
    
    const svg = d3.select("#packed-pie-chart").append("svg")
        .attr("viewBox", [0, 0, dimensions.width, dimensions.height])
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");

    
    const leaf = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)
    
    leaf.append("g")
        .attr("id", d => (d.leafUid = DOM.uid("leaf")).UserID)
        .attr("r", d => d.r)
    
    var pie = d3.pie()
        .sort(null)
        .value(d => d.value)
    
    var pieFn = data => [
        {label: "True", value: data["T"]}, 
        {label: "False", value: data["F"]},
        {label: "Non-Rumor", value: data["NR"]},
        {label: "Unverified", value: data["U"]}]
    
    leaf.each(function(d){
        var pieG = d3.select(this);
        var piedata = data2.filter(User => User.UserID == d.data[0])
        var setpie = pieFn(piedata[0])
        var arcs = pie(setpie);
        
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(d.r)
        
        pieG.append("g")
            .attr("stroke", "white")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.label))
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.label}: ${d.data.value.toLocaleString()}`);
        
        pieG.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)  
        
    });
    
    var keys = ["True", "False", "Non-Rumor", "Unverified"]
    
    svg.selectAll("mydots")
    .data(keys)
    .enter()
    .append("circle")
        .attr("cx", 10)
        .attr("cy", function(d,i){ return 10 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})

    
    svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
        .attr("x", 50)
        .attr("y", function(d,i){ return 10 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "left")
        
    return svg.node();

}


packed_pie_chart("/DataVisualizationFinalProject/js/688932211714818048.sample.csv")


// TWEET GRAPH KNOWN
async function tweet_graph(div_id, filename, color) {
    let data = await d3.json(filename);

    var width = 500
    var height= 500
    

    var svg = d3.select(div_id).append("svg")
        .attr("width", width)
        .attr("height", height)
    
    var nodes = data.nodes; //read from the dataset the nodes of the graph
    var arcs = data.links; //read from the dataset the arcs of the graph

    var layout = d3.forceSimulation(nodes)
    .force('center', d3.forceCenter(width/2, height/2))
    .force('collisions', d3.forceCollide())
    .force("manyBody", d3.forceManyBody().strength(-10))
    .force("link", d3.forceLink(arcs).id(d=>d.id).strength(0.1))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .on('tick', ticked);

    if (legand) {
    svg.append("circle").attr("cx",400).attr("cy",30).attr("r", 6).style("fill", "#00b32c")
    svg.append("circle").attr("cx",400).attr("cy",60).attr("r", 6).style("fill", "#ff0012")
    svg.append("text").attr("x", 420).attr("y", 30).text("Non-Rumor").style("font-size", "15px").attr("alignment-baseline","middle")
    svg.append("text").attr("x", 420).attr("y", 60).text("False").style("font-size", "15px").attr("alignment-baseline","middle")

    }

    
    var edges = svg.append("g")
                   .selectAll("line")
                   .data(arcs)
                   .enter()
                   .append("line")
                   .attr("stroke", "black")
                   .attr("stroke-width", 0.1);
    
    var node = svg.append("g")
                  .selectAll("circle")
                  .data(nodes)
                  .enter()
                  .append("circle")
                  .attr("fill", color) //set the appropriate color for each node depending on its group
                  .attr("r", 3);
     
    function ticked(){
      node
         .attr('cx', d => d.x)
         .attr('cy', d => d.y)
      
      edges
         .attr("x1", d => d.source.x)
         .attr("y1", d => d.source.y)
         .attr("x2", d => d.target.x)
         .attr("y2", d => d.target.y)
    }
    
    return svg.node() 
}

tweet_graph("#non-rumor-graph", "/DataVisualizationFinalProject/js/688932211714818048.json", "#00b32c");
tweet_graph("#false-graph", "/DataVisualizationFinalProject/js/520338188213444608.json", "#ff0012");

// TWEET GRAPH QUIZ
const questions = [
    {
        type: "Non-Rumor",
        path: "/DataVisualizationFinalProject/js/688932211714818048.json"
    },
    {
        type: "False",
        path: "/DataVisualizationFinalProject/js/520338188213444608.json"
    }
]
let question_number = 0;
let right = 0

// Seed the graph
tweet_graph("#network-select-graph", questions[question_number]["path"], "#7851a9");

document.getElementById("next").onclick = function() {
    // Get user input
    let user_choice_rb = document.getElementsByName('graph'); 
    let user_choice = "";
    for(i = 0; i < user_choice_rb.length; i++) { 
        if(user_choice_rb[i].checked) 
            user_choice = user_choice_rb[i].value;
    } 

    // Check against known
    if (user_choice == questions[question_number]["type"]) {
        console.log("Right!");
        right++;
    } else {
        console.log("Wrong!");
    }
    question_number++;

    // Replace the graph
    document.getElementById("network-select-graph").innerHTML = "";
    tweet_graph("#network-select-graph", questions[question_number]["path"], "#7851a9");
}

