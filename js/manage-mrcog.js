$(document).ready(function() {
  Tabletop.init({
    key: URL,
  callback: showData,
  simpleSheet: true
  });

  function showData(spreadsheets, tabletop) {
    loadData("MRCOG", spreadsheets, tabletop);
  }
 }) //close ready
