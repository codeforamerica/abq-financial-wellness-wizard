$(document).ready(function() {
	
	console.log('hello world');
	
	//button states
	$('.button').click(function(e) {
		
		e.preventDefault();
		showModules($(this).attr('id'));	
		buttonReset($(this).attr('id'));
		$(this).addClass('active');
		
	})
	
	$("#input-address").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#submit-address").click();
	    }
	});

	//reset button visual states as needed
	function buttonReset(id) {
		
		$('.button').each(function() {
			
			//console.log($(this).attr('id').split('-')[0]);
			if($(this).attr('id').split('-')[0] == id.split('-')[0]) {
				
				$(this).removeClass('active');
			}
		})
	}
	
	function reset(nodes) {
		
		for(var i = 0; i < nodes.length; i++) {
			
			$(nodes[i]).addClass('hidden');
			$(nodes[i] + ' .button').removeClass('active');
		}
		
		
	}
	
	function resetFinishers() {
		
		$('.finished').addClass('hidden');	
	}
	
	function showHide(showThese, hideThose) {
		
		for(var i = 0; i < showThese.length; i++) {
			
			$(showThese[i]).removeClass('hidden');
		}
		
		for(var i = 0; i < hideThose.length; i++) {
			
			$(hideThose[i]).addClass('hidden');
		}
	}
	
	function showModules(buttonID) {
		
		console.log('show module: ', buttonID);
		
		resetFinishers();
		
		switch(buttonID) {
			
			case 'public-yes':
			
				reset(['#ticket-sales', '#address', '#public-with-structures', '#certificate-of-use', '#street-closure', '#special-types', '#health']);
				showHide(['#address'], []);

				break;
				
			case 'public-no':
			
				reset(['#ticket-sales', '#address', '#public-with-structures', '#certificate-of-use', '#street-closure', '#special-types', '#health']);
				showHide(['#ticket-sales'], []);
				
				break;
			
			case 'tickets-yes':
			
				reset(['#address', '#public-with-structures', '#certificate-of-use', '#street-closure', '#special-types', '#health']);
				showHide(['#address'], []);
				break;
				
			case 'tickets-no':
				
				reset(['#address', '#public-with-structures', '#certificate-of-use', '#street-closure', '#special-types', '#health']);
				showHide(['#finished-not-public'], []);
				break;
				
			case 'address-yes':
				
				reset(['#public-with-structures', '#certificate-of-use', '#street-closure', '#special-types', '#health']);
				showHide(['form#address'], ['#no-address', '#umsa']);
				break;
				
			case 'address-no':
			
				reset(['#public-with-structures', '#certificate-of-use', '#street-closure', '#special-types', '#health']);
				showHide(['#umsa', '#no-address'], ['form#address']);
				$('#no-address .response').text("You don't have an address for your event yet.");
				break;
				
		}
	}
	
		
	function showFinished() {
		
		$('.finished').each(function() {
			
			console.log('hiding finished');
			$(this).addClass('hidden');
		})
	}
	
	
}) //close ready