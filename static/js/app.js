// read in data.json
const source = "samples.json";

// Get a reference to the div that holds the selection dropdown
var selectID = document.getElementById("selDataset");

// loop to add data as dropdown options
d3.json(source).then(function(data) {
      let option;
    for (let i = 0; i < data.names.length; i++) {
        option = document.createElement('option');
      	 option.text = data.names[i];
      	 option.value = data.names[i];
      	 selectID.add(option);
  };
});


// Display the default plot
function init() {
  d3.json(source).then(function(data) {
    // filter json data to only the sample records matching input ID
    var sampleData = data.samples.filter(d => d.id === "940");
    // combine all otu info for sample into single array
    var subSelection = [];
      for (var j = 0; j < sampleData[0].otu_ids.length; j++)
          subSelection.push({'otu_ids': sampleData[0].otu_ids[j], 'otu_labels': sampleData[0].otu_labels[j], 'sample_values': sampleData[0].sample_values[j]});
      // sort and slice the filtered data to get top 10 OTUs
      var sortedData = subSelection.sort((a,b)=>b.sample_values-a.sample_values);
      var top10 = sortedData.slice(0,10);
      var reversed = top10.reverse();
      console.log(reversed);
    var trace1 = [{
      x: reversed.map(row => row.sample_values),
      y: reversed.map(row => row.otu_ids),
      text: reversed.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
    }];

    var layout = {
      title: "Dominant OTUs in individual (placehholder)",
      xaxis: { title: "" },
      yaxis: { title: "" }
    };

    Plotly.newPlot("bar", trace1, layout);
  });
};

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var inputValue = dropdownMenu.property("value");
  // Fetch the JSON data and console log it
  d3.json(source).then(function(data) {

  // filter json data to only the sample records matching input ID
  var sampleData = data.filter(d => d.sample.id === inputValue);
    // sort and slice the filtered data to get top 10 OTUs
    var sortedData = sampleData.sort((a,b)=>b.sample.sample_values-a.sample.sample_values);
    var top10 = sortedData.slice(0,10);
    var reversed = top10.reverse();
    // var sample_values = data.samples.sample_values;
    // var otu_ids = data.samples.otu_ids;
    // var otu_labels = data.samples.otu_labels;

  // // filter json data to only the metadata matching input ID
  // var metaData = data.filter(d => d.metadata.id === inputValue);
  //   var ethnicity = data.metadata.ethnicity;
  //   var gender = data.metadata.gender;
  //   var age = data.metadata.age;
  //   var location = data.metadata.location;
  //   var bbtype = data.metadata.bbtype;
  //   var wfreq = data.metadata.wfreq;
  updatePlotly(reversed);
  });
};

function updatePlotly(newdata) {
  Plotly.restyle("bar", "values", [newdata]);
};


// Promise Pending
const dataPromise = d3.json(source);
console.log("Data Promise: ", dataPromise);

init();

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

//
// var ethnicity = data.metadata.ethnicity;
// var gender = data.metadata.gender;
// var age = data.metadata.age;
// var location = data.metadata.location;
// var bbtype = data.metadata.bbtype;
// var wfreq = data.metadata.wfreq;
