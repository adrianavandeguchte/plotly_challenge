// set source
const source = "samples.json";

// Get a reference to the div that holds the selection dropdown
var selectID = document.getElementById("selDataset");

// loop to add sample ids as dropdown options
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
      var labels = [];
      reversed.map(row => row.otu_ids).forEach((i) => {
        labels.push("OTU " + i)
      });
    var trace1 = [{
      x: reversed.map(row => row.sample_values),
      y: labels,
      text: reversed.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
    }];

    var layout = {
      title: "Dominant OTUs in Individual"
    };
    // filter json data to only the metadata matching input ID
    var metaData = data.metadata.filter(d => d.id === 940);
    console.log(metaData[0]);
    var metaTable = document.getElementById("sample-metadata");

    // loop to add sample ids as dropdown options
    for (let [key, value] of Object.entries(metaData[0])) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(`${key}: ${value}`));
      metaTable.appendChild(li);
      console.log(`${key}: ${value}`);
    }




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
    console.log(data)
  // filter json data to only the sample records matching input ID
  var sampleData = data.samples.filter(d => d.id === inputValue);
    // sort and slice the filtered data to get top 10 OTUs
    var subSelection = [];
      for (var j = 0; j < sampleData[0].otu_ids.length; j++)
          subSelection.push({'otu_ids': sampleData[0].otu_ids[j], 'otu_labels': sampleData[0].otu_labels[j], 'sample_values': sampleData[0].sample_values[j]});
      // sort and slice the filtered data to get top 10 OTUs
      console.log(subSelection);
      var sortedData = subSelection.sort((a,b)=>b.sample_values-a.sample_values);
      var top10 = sortedData.slice(0,10);
      var reversed = top10.reverse();

  // filter json data to only the metadata matching input ID
  var metaData = data.metadata.filter(d => d.id === inputValue);
  // filter json data to only the metadata matching input ID
    var ethnicity = data.metadata.ethnicity;
    var gender = data.metadata.gender;
    var age = data.metadata.age;
    var location = data.metadata.location;
    var bbtype = data.metadata.bbtype;
    var wfreq = data.metadata.wfreq;
  updatePlotly(reversed);
  });
};

function updatePlotly(newdata) {
  var newLabels = [];
  console.log(newdata);
  newdata.map(row => row.otu_ids).forEach((i) => {
    newLabels.push("OTU " + i)
  });
  console.log(newLabels)
  var update = {
      x: newdata.map(row => row.sample_values),
      y: newLabels,
      text: newdata.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
  }
  Plotly.restyle("bar", update);
};


// Promise Pending
const dataPromise = d3.json(source);
console.log("Data Promise: ", dataPromise);

init();


//
// var ethnicity = data.metadata.ethnicity;
// var gender = data.metadata.gender;
// var age = data.metadata.age;
// var location = data.metadata.location;
// var bbtype = data.metadata.bbtype;
// var wfreq = data.metadata.wfreq;
