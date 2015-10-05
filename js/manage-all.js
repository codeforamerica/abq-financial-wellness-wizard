$(document).ready(function() {
  Tabletop.init({
    key: URL,
    callback: showData,
    simpleSheet: true
  });

  function showData(spreadsheets, tabletop) {
    loadData(["MRCOG", "HeadingHome", "CABQ-HR"], "Accumulative Data", spreadsheets, tabletop);
  }
 }) //close ready
