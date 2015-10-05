$(document).ready(function() {
  Tabletop.init({
    key: URL,
  callback: showData,
  simpleSheet: true
  });

  function showData(spreadsheets, tabletop) {
    loadData("CABQ-HR", "CABQ HR", spreadsheets, tabletop);
  }
 }) //close ready
