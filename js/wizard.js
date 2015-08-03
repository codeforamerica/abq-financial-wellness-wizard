$(document).ready(function() {
	
	//Featherlight lightbox loads when page loads	
	$.featherlight("#introLightbox");                   
	
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
        var billLevel = getSelectedValue('bills');
        var savingsLevel = getSelectedValue('savings');
        var level = (worry == "bills")? billLevel : savingsLevel;
        window.location.href = "./directory.html?filter=" + worry + "&level=" + level + "&stress=" + stressLevel;
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
        $("#money").removeClass("hidden");
        break;
      case "money":
        $("#deficit").removeClass("hidden");
        break;
      case "deficit":
        $("#purchase").removeClass("hidden");
        break;
      case "purchase":
        $("#fetch").removeClass("hidden");
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
