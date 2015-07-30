$(document).ready(function() {
    var URL = "https://docs.google.com/spreadsheets/d/1hcZfADUtL0NKFJoY3TSSuYIbUy9W4xTT22fu1uHX52I/pubhtml";
    var colors = ["#333333", "#666666", "#999999", "#3a3a3a"];

    Tabletop.init({
      key: URL,
      callback: showData,
      simpleSheet: true
    });

    function showData(data, tabletop) {
      data = tabletop.sheets("Wizard").elements;

      populateCount(data);
      populateStress(data);
      populateCategory(data);
    }

    function populateCount(data) {
      $("#count").prepend(data.length);
    }

    function populateStress(data) {
      var stress = Sheetsee.getOccurance(data, "stress");
      var betterStress = {"Not Stressed": stress["1"], "Stressed":stress["2"], "Very Stressed":stress["3"], "Hopeless":stress["4"]};
      var stressColors = Sheetsee.makeColorArrayOfObject(betterStress, colors);
      var options = {
        units: "units",
        m: [0, 0, 0, 0],
        w: 400,
        h: 267,
        div: "#stress"
      }
      Sheetsee.d3PieChart(stressColors, options);
    }

    function populateCategory(data) {
      var category = Sheetsee.getOccurance(data, "filter");
      var betterCategory = {"Paying Bills": category["bills"], "Saving Money": category["savings"]};
      var categoryColors = Sheetsee.makeColorArrayOfObject(betterCategory, colors);
      var options = {
        units: "units",
        m: [0, 0, 0, 0],
        w: 400,
        h: 267,
        div: "#category"
      }
      Sheetsee.d3PieChart(categoryColors, options);
    }
}) //close ready
