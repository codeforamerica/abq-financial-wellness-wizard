$(document).ready(function() {
  Tabletop.init({
    key: URL,
  callback: showData,
  simpleSheet: true
  });

  function showData(spreadsheets, tabletop) {
    var sheetName = getParameterByName('b').toUpperCase();
    var friendlyName = sheetName.replace('-', ' ');
    if(!sheetName){
      sheetName = tabletop.model_names;
      friendlyName = 'Accumulative Data';
    }
    loadData(sheetName, friendlyName, spreadsheets, tabletop);
  }

  // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
 }) //close ready
