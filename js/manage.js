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
      populateBarGraph(data, "bills");
      populateBarGraph(data, "savings");
    }

    function populateCount(data) {
      $("#count").prepend(data.length);
    }

    function populateStress(data) {
      var stress = Sheetsee.getOccurance(data, "stress");
      var total = data.length;
      var betterStress = {"Not Stressed": percent(stress["1"], total), "Stressed":percent(stress["2"], total), "Very Stressed":percent(stress["3"], total), "Hopeless":percent(stress["4"], total)};
      var stressColors = Sheetsee.makeColorArrayOfObject(betterStress, colors);
      var options = {
        units: "units",
        m: [0, 0, 0, 0],
        w: 500,
        h: 267,
        div: "#stress"
      }
      Sheetsee.d3PieChart(stressColors, options);
    }

    function percentage(value, total) {
      return value/total;
    }

    function percent(value, total) {
      return (percentage(value, total)*100).toFixed(0);
    }

    function populateCategory(data) {
      var category = Sheetsee.getOccurance(data, "filter");
      var total = data.length;
      var betterCategory = {"Paying Bills": percent(category["bills"], total), "Saving Money": percent(category["savings"], total)};
      var categoryColors = Sheetsee.makeColorArrayOfObject(betterCategory, colors);
      var options = {
        units: "units",
        m: [0, 0, 0, 0],
        w: 500,
        h: 267,
        div: "#category"
      }
      Sheetsee.d3PieChart(categoryColors, options);
    }

    function populateBarGraph(data, filter) {
      var filteredData = Sheetsee.getMatches(data, filter, "filter");
      var level = Sheetsee.getOccurance(filteredData, "level");
      var never = getLevelStress(filteredData, "1", "Never");
      var couple = getLevelStress(filteredData, "2", "Couple Times");
      var monthly = getLevelStress(filteredData, "3", "Monthly");
      var betterLevels = never.concat(couple).concat(monthly);

      var svg = dimple.newSvg("#" + filter, 400, 271);
      var barChart = new dimple.chart(svg, betterLevels);
      var x = barChart.addCategoryAxis("x", "frequency");
      x.addOrderRule("s");
      x.title = "";
      var y = barChart.addMeasureAxis("y", "total");
      y.title = "respondents";
      y.tickFormat ="%";
      barChart.addSeries("stress", dimple.plot.bar);
      barChart.defaultColors = colors.map(function(hex){ return new dimple.color(hex); });
      barChart.addLegend(0, 10, 410, 20, "right");
      barChart.draw();
    };

    function getLevelStress(data, level, levelName) {
      var filterByLevel = Sheetsee.getMatches(data, level, "level");
      var stress = Sheetsee.getOccurance(filterByLevel, "stress");
      var total = filterByLevel.length;
      var not = {stress: "Not Stressed", frequency: levelName, total: percentage(stress["1"], total), s: level};
      var some = {stress: "Stressed", frequency: levelName, total: percentage(stress["2"], total), s: level};
      var very = {stress: "Very Stressed", frequency: levelName, total: percentage(stress["3"], total), s: level};
      var hopeless = {stress: "Hopeless", frequency: levelName, total: percentage(stress["4"], total), s: level};
      return [not, some, very, hopeless];
    }

}) //close ready
