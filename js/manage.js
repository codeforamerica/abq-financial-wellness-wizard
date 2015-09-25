    var URL = "https://docs.google.com/spreadsheets/d/1U_2YzAoJ55tHhtWBuYGktqun73-xDv0zxkprPqusjSs/pubhtml";
    var colors = ["rgba(134,152,166,0.25)", "rgba(134,152,166,0.50)", "rgba(134,152,166,0.75)", "rgba(134,152,166,1)"];
    var graphTitleMapping = {"overview_1": "Overview 1", "overview_2": "Overview 2", "present_security_1":"How much of your monthly income goes towards bills?", "present_security_2":"How often do you worry about covering your expenses?", "present_security_3":"Do you ever miss a bill payment?", "future_security_1":"How often do you put money into savings?", "future_security_2":"How often do you take money out of savings to cover an expense?", "future_security_3":"If you went without working, how long would your savings support you?"}

    function loadData(sheetName, spreadsheets, tabletop) {
      var data = [];
      var sheet;
      var columnNames = [];

      if( typeof sheetName === 'string' ) {
        sheet = tabletop.sheets(sheetName);
        columnNames = sheet.column_names;
        data = sheet.elements;
      }
      else {
        $.each(sheetName, function(index, value) {
          sheet = tabletop.sheets(value);
          columnNames = sheet.column_names;
          data = data.concat(sheet.elements);
        });
      }

      var overview = columnNames.filter(containsOverview);
      var futureSecurity = columnNames.filter(containsFuture);
      var presentSecurity = columnNames.filter(containsPresent);

      createRows("overview", overview);
      createRows("present", presentSecurity);
      createRows("future", futureSecurity);

      $.each(presentSecurity.concat(futureSecurity), function() {
        populatePieChart(data, this);
      });

      $.each(overview, function() {
        populateBarGraph(data, this);
      });
    }

    function containsOverview(element) {
      return element.search("overview") != -1;
    }

    function containsFuture(element) {
      return element.search("future") != -1 && element.search("security") != -1;
    }

    function containsPresent(element) {
      return element.search("present") != -1 && element.search("security") != -1;
    }

    function createRows(sectionName, columnNames) {
      var section = $("#" + sectionName);
      var row;

      $.each(columnNames, function(index, element) {
        if(index%2==0) {
          row = $('<div/>', {
                class: 'row'
          }).appendTo(section);
        }

        var column = $('<div/>', {
          class: 'six columns'
        }).appendTo(row);

        var header = $('<div/>', {
          class: 'column-header',
          text: getGraphTitle(element)
        }).appendTo(column);

        var chart = $('<div/>', {
          id: element,
          class: 'pieChart'
        }).appendTo(column);
      });
    }

    function getGraphTitle(column) {
      return graphTitleMapping[column] || column;
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

    function populateBarGraph(data, columnName) {
      var columnData = Sheetsee.getOccurance(data, columnName);
      var formattedData = [];
      $.each(columnData, function(index, value) {
        formattedData.push({ "frequency": index, "count":value});
      });

      var svg = dimple.newSvg("#" + columnName, 500, 271);
      var barChart = new dimple.chart(svg, formattedData);
      var x = barChart.addMeasureAxis("x", "count");
      var y = barChart.addCategoryAxis("y", "frequency");
      var series = barChart.addSeries("frequency", dimple.plot.bar);
      barChart.defaultColors = colors.map(function(hex){ return new dimple.color(hex); });
      barChart.draw();
    }

    function populateBarGraphOld(data, filter) {
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
