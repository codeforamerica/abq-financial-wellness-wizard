$(document).ready(function() {
    var URL = "https://docs.google.com/spreadsheets/d/1hcZfADUtL0NKFJoY3TSSuYIbUy9W4xTT22fu1uHX52I/pubhtml";
    var colors = ["rgba(134,152,166,0.25)", "rgba(134,152,166,0.50)", "rgba(134,152,166,0.75)", "rgba(134,152,166,1)"];
    var stressLevels = ["Not Stressed", "Stressed", "Very Stressed", "Hopeless"];

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
        div: "#stressChart"
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
        div: "#categoryChart"
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

      var svg = dimple.newSvg("#" + filter + "Chart", 400, 271);
      var barChart = new dimple.chart(svg, betterLevels);
      var x = barChart.addCategoryAxis("x", "frequency");
      x.addOrderRule("s");
      x.title = "";
      var y = barChart.addMeasureAxis("y", "count");
      y.title = "respondents";
      var series = barChart.addSeries("stress", dimple.plot.bar);
      series.getTooltipText = function (e) {
        var item = (betterLevels.find(function(o,i,ary){return o.stress == e.aggField[0] && o.frequency == e.x}).percentage * 100).toFixed(0);
              return [ e.aggField[0], item + "% of " + e.x ];
                  };
      barChart.defaultColors = colors.map(function(hex){ return new dimple.color(hex); });
      barChart.addLegend(0, 10, 410, 20, "right");
      barChart.draw();
    };

    function getLevelStress(data, level, levelName) {
      var filterByLevel = Sheetsee.getMatches(data, level, "level");
      var stress = Sheetsee.getOccurance(filterByLevel, "stress");
      var total = filterByLevel.length;
      var not = {stress: "Not Stressed", frequency: levelName, count: stress["1"], percentage: percentage(stress["1"], total), s: level};
      var some = {stress: "Stressed", frequency: levelName, count: stress["2"], percentage: percentage(stress["2"], total), s: level};
      var very = {stress: "Very Stressed", frequency: levelName, count: stress["3"], percentage: percentage(stress["3"], total), s: level};
      var hopeless = {stress: "Hopeless", frequency: levelName, count: stress["4"], percentage: percentage(stress["4"], total), s: level};
      return [not, some, very, hopeless];
    }

}) //close ready