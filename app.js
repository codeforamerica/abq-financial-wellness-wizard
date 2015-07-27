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
		
		var treeclimber = ['#cause', '#worry', '#savings', '#bills', '#paycheck', '#enough', '#habits', '#bills-end-1', '#bills-end-2', '#bills-end-3', '#savings-end-1', '#savings-end-2', '#savings-end-3']
		
		switch(buttonID) {
			
			case 'stress-1':
			case 'stress-2':
			case 'stress-3':
			case 'stress-4':
			
				reset(treeclimber);
				showHide(['#worry'], []);
				break;
			
			case 'worry-bills':
			
				reset(treeclimber);
				showHide(['#bills', '#worry'], []);
				break;
				
			case 'worry-savings':
				
				reset(treeclimber);
				showHide(['#savings', '#worry'], []);
				break;
				
			//BILLS
			
			case 'bills-1':
			
				reset(treeclimber);
				showHide(['#bills-end-1', '#worry' , '#bills']);
				break;
				
				
			case 'bills-2':
			
				reset(treeclimber);
				showHide(['#bills-end-2', '#worry' , '#bills']);
				break;
			
			case 'bills-3':
			
				reset(treeclimber);
				showHide(['#bills-end-3', '#worry' , '#bills']);
				break;
			
			//SAVINGS
				
			case 'savings-1':
			
				reset(treeclimber);
				showHide(['#savings-end-1', '#worry', '#savings']);
				break;
				
			case 'savings-2':
			
				reset(treeclimber);
				showHide(['#savings-end-2', '#worry', '#savings']);
				break;
			
			case 'savings-3':
			
				reset(treeclimber);
				showHide(['#savings-end-3', '#worry', '#savings']);
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