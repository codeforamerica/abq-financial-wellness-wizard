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
      scroll(next.get()[0], next.parent());
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

  function scroll(element, parent){
    $(element).animate({ scrollTop: $(element).scrollTop() + $(element).offset().top - $(element).offset().top }, { duration: 'slow', easing: 'swing'});
    $('html,body').animate({ scrollTop: $(element).offset().top - ($(window).height()/3) }, { duration: 1000, easing: 'swing'});
  }
}) //close ready
