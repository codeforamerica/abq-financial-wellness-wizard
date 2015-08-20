$(document).ready(function() {
	//Featherlight lightbox loads when page loads	
	$.featherlight("#introLightbox");    
	
	//Reset button at end of form, reloads and scrolls to top of page
	$('#reload').click(function() {
    	      location.reload();
			  window.scrollTo(x-coord, y-coord);
	});
	
	//button states
	$('.button').click(function(e) {
		e.preventDefault();
    $(this).siblings().removeClass('active');
		$(this).addClass('active');
    showNextQuestion($(this).attr('id'));
	});

  $('#submit').click(function(e) {
        window.location.href = "./thanks.html";
  });

  function showNextQuestion(id) {
    if(id) {
      var next = $('#container').find('.hidden').first();
      next.removeClass('hidden');
      if(next.attr('id') == 'open')
        $('#fetch').removeClass('hidden');
    }
  }

  function getSelectedValue(id) {
    var selected = $("#" + id + " span.active").attr('id');
    if (selected)
      selected = selected.split('-')[1];
    return selected;
  }

}) //close ready
