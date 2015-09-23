$(document).ready(function() {
    var URL = "https://docs.google.com/spreadsheets/d/1U_2YzAoJ55tHhtWBuYGktqun73-xDv0zxkprPqusjSs/pubhtml";
    var sheets = ["MRCOG", "HeadingHome"];
    var colors = ["rgba(134,152,166,0.25)", "rgba(134,152,166,0.50)", "rgba(134,152,166,0.75)", "rgba(134,152,166,1)"];

    Tabletop.init({
      key: URL,
      callback: showData,
      simpleSheet: true
    });

    function showData(spreadsheets, tabletop) {
      var sheetName = sheets[0];
      var sheet = tabletop.sheets(sheetName);
      var columnNames = sheet.column_names;
      var data = sheet.elements;

      createSections(columnNames);
      $.each(columnNames, function() {
        populatePieChart(data, this);
      });
    }

    function createSections(columnNames) {
      var container = $("#container");
      var row;

      $.each(columnNames, function(index, element) {
        if(index%2==0) {
          var section = $('<section/>').appendTo('#container');
          row = $('<div/>', {
                class: 'row'
          }).appendTo(section);
        }

        var column = $('<div/>', {
          class: 'six columns'
        }).appendTo(row);

        var header = $('<div/>', {
          class: 'column-header',
          text: element
        }).appendTo(column);

        var chart = $('<div/>', {
          id: element,
          class: 'pieChart'
        }).appendTo(column);
      });
    }

    function populatePieChart(data, columnName) {
      var formattedData = getFormattedData(data, columnName);
      var colorArray = Sheetsee.makeColorArrayOfObject(formattedData, colors);

      var options = {
        units: "units",
        m: [0, 0, 0, 0],
        w: 500,
        h: 267,
        div: "#" + columnName
      }
      Sheetsee.d3PieChart(colorArray, options);
    }

    function getFormattedData(data, columnName) {
      var columnData = Sheetsee.getOccurance(data, columnName);
      var sum = 0;
      var arrayOfOccurances = Object.keys(columnData).map(key=>columnData[key]);
      $.each(arrayOfOccurances, function(){sum+=parseFloat(this) || 0;});
      $.each(Object.keys(columnData), function(){
        var occurance = columnData[this];
        columnData[this] = percent(occurance, sum);
      })
      return columnData;
    }

    function percentage(value, total) {
      return value/total;
    }

    function percent(value, total) {
      return (percentage(value, total)*100).toFixed(0);
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
}) //close ready
