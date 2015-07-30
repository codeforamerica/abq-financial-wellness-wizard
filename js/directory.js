$(document).ready(function() {
    var columnToSearch = 'tag';
    var URL = "https://docs.google.com/spreadsheets/d/1hcZfADUtL0NKFJoY3TSSuYIbUy9W4xTT22fu1uHX52I/pubhtml";
    var level = getParameterByName("level");
	var stressLevel = getParameterByName('stress');
	var filter = getParameterByName("filter");

	addQuotation();
    
    Tabletop.init({
      key: URL,
      callback: showData,
      simpleSheet: true
    });

    function showData(data, tabletop) {
      data = tabletop.sheets("Sheet1").elements;
      var filteredData = Sheetsee.getMatches(data, filter, columnToSearch);
      var tableOptions = {
        "data": filteredData,
        "pagination": 10,
        "tableDiv": "#placeholder"
      };

      Sheetsee.makeTable(tableOptions);
      Sheetsee.initiateTableFilter(tableOptions);
    }

	function addQuotation() {
		var quotation = ""

		if(filter == "bills") {
			if(stressLevel == "1")
				quotation = "According to a recent Bankrate.com survey,  only about one in four Americans (24 percent) are saving more than 10 percent of their paychecks each year"
			else if(stressLevel == "2")
				quotation = "Roughly 76% of Americans are living paycheck-to-paycheck, with little to no emergency savings, according to a survey released by Bankrate.com"
			else
				quotation = "More than 35 percent of Americans have debts and unpaid bills that have been reported to collection agencies, according to a study released by the Urban Institute"
		} else {
			if(stressLevel == "1")
				quotation = "Did you know that Americans who are thinking about both retirement and emergency savings should be putting away roughly 15 percent of annual incomes each year"
			else if(stressLevel == "2")
				quotation = "Did you know that Americans who are thinking about both retirement and emergency savings should be putting away roughly 15 percent of annual incomes each year"
			else
				quotation = "Fewer than one in four Americans have enough money in their savings account to cover at least six months of expenses, enough to help cushion the blow of a job loss, medical emergency or some other unexpected event"
		}
		
		$("#quotation").append(quotation);
	}
	
    // http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}) //close ready
