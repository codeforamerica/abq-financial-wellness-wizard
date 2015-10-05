$(document).ready(function() {
  Tabletop.init({
    key: URL,
  callback: showData,
  simpleSheet: true
  });

  function showData(spreadsheets, tabletop) {
    loadData("MRCOG", "MRCOG", spreadsheets, tabletop);
  }
 }) //close ready
