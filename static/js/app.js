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
function buildPlots() {
  d3.json(source).then(function(data) {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var inputValue = dropdownMenu.property("value");
    // filter json data to only the sample records matching input ID
    var sampleData = data.samples.filter(d => d.id === inputValue);
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
    var barTrace = [{
      x: reversed.map(row => row.sample_values),
      y: labels,
      text: reversed.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
    }];
    var title = ("Dominant OTUs for ID " + inputValue)
    var barLayout = {
      title: title
    };
    // filter json data to only the metadata matching input ID
    var metaData = data.metadata.filter(d => d.id === parseInt(inputValue));
    console.log(metaData[0]);
    var metaTable = document.getElementById("sample-metadata");
    metaTable.innerHTML = "";
    // loop to add metadata table
    for (let [key, value] of Object.entries(metaData[0])) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(`${key}: ${value}`));
      metaTable.appendChild(li);
    }

    // build of bubble plot
    var bubbleTrace = [{
      x: subSelection.map(row => row.otu_ids),
      y: subSelection.map(row => row.sample_values),
      mode: 'markers',
      text: subSelection.map(row => row.otu_labels),
      marker: {
        size: subSelection.map(row => row.sample_values),
        color: subSelection.map(row => row.otu_ids)
      }
    }];

    var bubbleLayout = {
      title: 'OTU Distribution',
      showlegend: false,
    };


    // build of gauge chart
    var gaugeTrace = [
  	  {
  		domain: { x: [0, 1], y: [0, 1] },
  		value: metaData[0].wfreq,
  		title: { text: "" },
  		type: "indicator",
  		mode: "gauge+number",
      gauge: {
        bar: { color: "#337ab7" },
        axis: { range: [0, 9] },
        steps: [
          { range: [0, 1], color: "#a1a1a1" },
          { range: [1, 2], color: "#bcc1c6" },
          { range: [2, 3], color: "#c6d3df" },
          { range: [3, 4], color: "#c4ddf1" },
          { range: [4, 5], color: "#b4d5f1" },
          { range: [5, 6], color: "#a8d0f3" },
          { range: [6, 7], color: "#8ec5f5" },
          { range: [7, 8], color: "#70b3ed" },
          { range: [8, 9], color: "#4599e1" },
        ]
  	}}];

    var gaugeLayout = {
      title: "Belly Button Washes per Week"
    }

    Plotly.newPlot('gauge', gaugeTrace, gaugeLayout);
    Plotly.newPlot("bar", barTrace, barLayout);
    Plotly.newPlot('bubble', bubbleTrace, bubbleLayout);
  });
};

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", buildPlots);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var inputValue = dropdownMenu.property("value");
//   console.log(inputValue);
//   // Fetch the JSON data and console log it
//   d3.json(source).then(function(data) {
//     console.log(data)
//   // filter json data to only the sample records matching input ID
//   var sampleData = data.samples.filter(d => d.id === inputValue);
//     // sort and slice the filtered data to get top 10 OTUs
//     var subSelection = [];
//       for (var j = 0; j < sampleData[0].otu_ids.length; j++)
//           subSelection.push({'otu_ids': sampleData[0].otu_ids[j], 'otu_labels': sampleData[0].otu_labels[j], 'sample_values': sampleData[0].sample_values[j]});
//       // sort and slice the filtered data to get top 10 OTUs
//       console.log(subSelection);
//       var sortedData = subSelection.sort((a,b)=>b.sample_values-a.sample_values);
//       var top10 = sortedData.slice(0,10);
//       var reversed = top10.reverse();
//
//   // filter json data to only the metadata matching input ID
//   var metaData = data.metadata.filter(d => d.id === inputValue);
//   // filter json data to only the metadata matching input ID
//     var ethnicity = data.metadata.ethnicity;
//     var gender = data.metadata.gender;
//     var age = data.metadata.age;
//     var location = data.metadata.location;
//     var bbtype = data.metadata.bbtype;
//     var wfreq = data.metadata.wfreq;
//   updatePlotly(reversed);
//   });
// };
//
// function updatePlotly(newdata) {
//   var newLabels = [];
//   console.log(newdata);
//   newdata.map(row => row.otu_ids).forEach((i) => {
//     newLabels.push("OTU " + i)
//   });
//   console.log(newLabels)
//   var update = {
//       x: newdata.map(row => row.sample_values),
//       y: newLabels,
//       text: newdata.map(row => row.otu_labels),
//       type: "bar",
//       orientation: "h"
//   }
//   Plotly.restyle("bar", update);
// };
//
//
// // Promise Pending
// const dataPromise = d3.json(source);
// console.log("Data Promise: ", dataPromise);

buildPlots();


//
// var ethnicity = data.metadata.ethnicity;
// var gender = data.metadata.gender;
// var age = data.metadata.age;
// var location = data.metadata.location;
// var bbtype = data.metadata.bbtype;
// var wfreq = data.metadata.wfreq;
