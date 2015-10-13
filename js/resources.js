  <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        var URL = "https://docs.google.com/spreadsheets/d/1hcZfADUtL0NKFJoY3TSSuYIbUy9W4xTT22fu1uHX52I/pubhtml"
        Tabletop.init( { key: URL, callback: myData, simpleSheet: true } )
    })
    function myData(data) {
          var tableOptions = {
              "data": data,
              "pagination": 10,
              "filterDiv": "#placeholderFilter",
              "tableDiv": "#placeholder" 
              }
  
		  Sheetsee.makeTable(tableOptions)
		  Sheetsee.initiateTableFilter(tableOptions)
		  
		  console.log(data);
    }
  </script>