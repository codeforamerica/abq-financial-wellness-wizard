var URL = "https://docs.google.com/spreadsheets/d/1U_2YzAoJ55tHhtWBuYGktqun73-xDv0zxkprPqusjSs/pubhtml";
var colors = ["rgb(158, 158, 158)", "rgb(121, 85, 72)", "rgb(96, 125, 139)", "rgb(156, 39, 176)"];
var graphTitleMapping = {"overview_1": "How often do you feel stress over finances?", "overview_2": "Which of these causes the most stress?", "present_security_1":"How much of your monthly income goes towards bills?", "present_security_2":"How often do you worry about covering your expenses?", "present_security_3":"Do you ever miss a bill payment?", "future_security_1":"How often do you put money into savings?", "future_security_2":"How often do you take money out of savings to cover an expense?", "future_security_3":"If you went without working, how long would your savings support you?", "future_freedom_1":"In the future, how often would you like to prioritize the following?", "present_freedom_1":"How often do you feel like you have the financial freedom to do the following?"};
var graphSeriesMapping = {"future_freedom_1":"Family", "future_freedom_2":"Education", "future_freedom_3":"Vacation", "present_freedom_1":"Family", "present_freedom_2":"Education", "present_freedom_3":"Vacation"};
var noAnswer = "Blank";

function loadData(sheetName, title, spreadsheets, tabletop) {
  var data = [];
  var sheet;
  var columnNames = [];
  var png;

  $('#title').append(': ' + title);

  if( typeof sheetName === 'string' ) {
    sheet = tabletop.sheets(sheetName);
    columnNames = sheet.column_names;
    data = sheet.elements;
    png = sheetName.toLowerCase();
  }
  else {
    png = 'all-pilot';
    $.each(sheetName, function(index, value) {
      sheet = tabletop.sheets(value);
      columnNames = sheet.column_names;
      data = data.concat(sheet.elements);
    });
  }

  var overview = columnNames.filter(containsOverview);
  var futureSecurity = columnNames.filter(containsFuture);
  var presentSecurity = columnNames.filter(containsPresent);
  var futureFreedom = columnNames.filter(containsFutureFreedom);
  var presentFreedom = columnNames.filter(containsPresentFreedom);

  createRows("overview", overview);
  createRows("present-security", presentSecurity);
  createRows("future-security", futureSecurity);
  createRows("present-freedom", presentFreedom.slice(0, 1));
  createRows("future-freedom", futureFreedom.slice(0, 1));

  $.each(presentSecurity.concat(futureSecurity), function() {
    populatePieChart(data, this);
  });

  $.each(overview, function() {
    populateBarGraph(data, this);
  });

  populateLineGraph(data, presentFreedom);
  populateLineGraph(data, futureFreedom);
  populateDiamond(png);
}

function populateDiamond(pngName) {
}

function containsOverview(element) {
  return element.search("overview") != -1;
}

function containsFutureFreedom(element) {
  return element.search("future") != -1 && element.search("freedom") != -1;
}

function containsPresentFreedom(element) {
  return element.search("present") != -1 && element.search("freedom") != -1;
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

function populateLineGraph(data, columnNames) {
  var columnName = columnNames.slice(0, 1);
  var svg = dimple.newSvg("#" + columnName, 700, 425);
  var formattedData = [];

  $.each(columnNames, function() {
    var columnData = Sheetsee.getOccurance(data, this);
    var series = graphSeriesMapping[this] || this;
    $.each(columnData, function(index, value) {
      var frequency = (index=="")? noAnswer : index;
      formattedData.push({"series":series, "frequency":frequency, "count":value});
    });
  });

  var myChart = new dimple.chart(svg, formattedData);
  myChart.setBounds(60, 30, "85%", "70%");

  var x = myChart.addCategoryAxis("x", "frequency");
  x.title = "";

  var y = myChart.addMeasureAxis("y", "count");
  y.title = "";

  myChart.defaultColors = colors.map(function(hex){ return new dimple.color(hex); });
  var series = myChart.addSeries("series", dimple.plot.line);
  myChart.addLegend(0, 10, 500, 20, "right");
  myChart.draw();

  series.getTooltipText = function (e) {
    return [e.aggField[0],  e.cx + " " + e.cy];
  };
}

function populatePieChart(data, columnName) {
  var formattedData = getFormattedData(data, columnName);
  var colorArray = Sheetsee.makeColorArrayOfObject(formattedData, colors);

  var options = {
    units: "units",
    m: [0, 0, 0, 0],
    w: 500,
    h: 300,
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
    var frequency = (index=="")? noAnswer : index;
    formattedData.push({ "frequency": frequency, "count":value});
  });

  var svg = dimple.newSvg("#" + columnName, "100%", 350);
  var barChart = new dimple.chart(svg, formattedData);
  var x = barChart.addMeasureAxis("x", "count");
  x.title = "";

  var y = barChart.addCategoryAxis("y", "frequency");
  y.title = "";

  var series = barChart.addSeries("frequency", dimple.plot.bar);
  series.getTooltipText = function(e) {
    return [e.aggField[0],  e.cx];
  };

  barChart.defaultColors = colors.map(function(hex){ return new dimple.color(hex); });
  barChart.draw();
  y.shapes.selectAll(".tick text")
      .call(wrap, 50);
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
  words = text.text().split(/\s+/).reverse(),
  word,
  line = [],
  lineNumber = 0,
  lineHeight = 1.1, // ems
  y = text.attr("y"),
  dy = parseFloat(text.attr("dy")),
  xOffset = -6,
  tspan = text.text(null).append("tspan").attr("x", xOffset).attr("y", y).attr("dy", dy + "em");
  while (word = words.pop()) {
    line.push(word);
    tspan.text(line.join(" "));
    if (tspan.node().getComputedTextLength() > width) {
      line.pop();
      tspan.text(line.join(" "));
      line = [word];
      tspan = text.append("tspan").attr("x", xOffset).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
    }
  }
  });
}
