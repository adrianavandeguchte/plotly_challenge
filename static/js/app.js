// read in data.json
const source = "samples.json";

// Display the default plot
function init() {
  var default = [{
    x: data.map(row => row.pair),
    y: data.map(row => row.greekSearchResults),
    text: data.map(row => row.greekName),
    type: "hbar"
  }];

  var layout = {
    title: "Dominant OTUs in individual (placehholder)",
    xaxis: { title: "" },
    yaxis: { title: "" }
  };

  Plotly.newPlot("bar", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  var data = [];








// Fetch the JSON data and console log it
d3.json(source).then(function(data) {

  // build arrays of each data field
  var sample_values = data.samples.sample_values;
  var otu_ids = data.samples.otu_ids;
  var otu_labels = data.samples.otu_labels;
  var ethnicity = data.metadata.ethnicity;
  var gender = data.metadata.gender;
  var age = data.metadata.age;
  var location = data.metadata.location;
  var bbtype = data.metadata.bbtype;
  var wfreq = data.metadata.wfreq;
});
// Promise Pending
const dataPromise = d3.json(source);
console.log("Data Promise: ", dataPromise);


// Display the default plot
function init() {
  var default = [{
    x: data.map(row => row.pair),
    y: data.map(row => row.greekSearchResults),
    text: data.map(row => row.greekName),
    type: "hbar"
  }];


// var trace1 = {
//   x: data.map(row => row.pair),
//   y: data.map(row => row.greekSearchResults),
//   text: data.map(row => row.greekName),
//   type: "hbar"
// };
//
//
// // Combining both traces
// var data = [trace1;
//
// // Apply the group barmode to the layout
// var layout = {
//   title: "Dominant OTUs in individual (placehholder)",
//   xaxis: { title: "" },
//   yaxis: { title: "" }
// };
//
// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("bar", data, layout);
