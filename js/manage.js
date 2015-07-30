$(document).ready(function() {
    var URL = "https://docs.google.com/spreadsheets/d/1hcZfADUtL0NKFJoY3TSSuYIbUy9W4xTT22fu1uHX52I/pubhtml";

    Tabletop.init({
      key: URL,
      callback: showData,
      simpleSheet: true
    });

    function showData(data, tabletop) {
      data = tabletop.sheets("Wizard").elements;

      populateCount(data);
      populateStress(data);
      populateBills(data);
      populateSavings(data);
    }

    function populateCount(data) {
      $('#count').prepend(data.length);
    }

    function populateStress(data) {
      populateLevel(data, "1", "stress", "stress");
      populateLevel(data, "2", "stress", "stress");
      populateLevel(data, "3", "stress", "stress");
      populateLevel(data, "4", "stress", "stress");
    }

    function populateBills(data) {
      var bills = Sheetsee.getMatches(data, "bills", "filter");
      populateLevel(bills, "1", "level", "bills");
      populateLevel(bills, "2", "level", "bills");
      populateLevel(bills, "3", "level", "bills");
    }

    function populateSavings(data) {
      var savings = Sheetsee.getMatches(data, "savings", "filter");
      populateLevel(savings, "1", "level", "savings");
      populateLevel(savings, "2", "level", "savings");
      populateLevel(savings, "3", "level", "savings");
    }

    function populateLevel(data, level, column, id) {
      var levelData = Sheetsee.getMatches(data, level, column);
      $('#' + id + '-' + level).append(levelData.length);
    }
}) //close ready
