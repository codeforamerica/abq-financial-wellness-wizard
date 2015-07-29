$(document).ready(function() {
    var columnToSearch = 'tag';
    var URL = "https://docs.google.com/spreadsheets/d/1hcZfADUtL0NKFJoY3TSSuYIbUy9W4xTT22fu1uHX52I/pubhtml";
    var searchBy = document.URL.split('?')[1].split('=')[1];

    Tabletop.init({
      key: URL,
      callback: showData,
      simpleSheet: true
    });

    function showData(data, tabletop) {
      data = tabletop.sheets("Sheet1").elements;
      var filteredData = Sheetsee.getMatches(data, searchBy, columnToSearch);
      var tableOptions = {
        "data": filteredData,
        "pagination": 10,
        "tableDiv": "#placeholder"
      };

      Sheetsee.makeTable(tableOptions);
      Sheetsee.initiateTableFilter(tableOptions);
    }

    // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}) //close ready
