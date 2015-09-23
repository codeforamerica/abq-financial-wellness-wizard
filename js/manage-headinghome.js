$(document).ready(function() {
  Tabletop.init({
    key: URL,
  callback: showData,
  simpleSheet: true
  });

  function showData(spreadsheets, tabletop) {
    loadData("HeadingHome", spreadsheets, tabletop);
  }
 }) //close ready
