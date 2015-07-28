$(document).ready(function() {
	
	//button states
	$('.button').click(function(e) {
		e.preventDefault();
    $(this).siblings().removeClass('active');
		$(this).addClass('active');
    showNextQuestion($(this).attr('id'));
	});

  $('#submit').click(function(e) {
        $('#data').empty();
        var stressLevel = getSelectedValue('stress');
        var worry = getSelectedValue('worry');
        var bill = getSelectedValue('bills');
        var savings = getSelectedValue('savings');
        $('#data').append('<h1>' + stressLevel + '</h1>');
        $('#data').append('<h1>' + worry + '</h1>');
        $('#data').append('<h1>' + bill + '</h1>');
        $('#data').append('<h1>' + savings + '</h1>');
  });

  function showNextQuestion(id) {
    switch(id.split('-')[0]) {
      case "stress":
        $('#worry').removeClass('hidden');
        break;
      case "worry":
        var answeredBills = id.split('-')[1]=='bills'
        $('#bills').toggleClass('hidden', !answeredBills);
        $('#savings').toggleClass('hidden', answeredBills);
        break;
      case "savings":
      case "bills":
        $('#fetch').removeClass('hidden');
        break;
    }
  }

  function getSelectedValue(id) {
    var selected = $("#" + id + " span.active").attr('id');
    if (selected)
      selected = selected.split('-')[1];
    return selected;
  }

}) //close ready
