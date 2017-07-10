$(function() {

	$(document).ready(function(){
		
		var ie_version = get_ie_version();

		if (ie_version.isTheBrowser == true && ie_version.actualVersion <= 10) {
			
			$('html').addClass('is-old-ie');
			
			$('body').prepend('<div class="old-ie-warning">If you want to use this web site you should update yout browser: <a target="_blank" href="http://outdatedbrowser.com/en">http://outdatedbrowser.com/en</a></div>');
			
		}
				
		if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
			$('html').addClass('is-mobile-browser');
		}
		
		
		//
		// laukelis su kalendoriumi
		//
		if ($('.datepicker').length > 0) {
			
			$('.datepicker').each(function(i,o){
			
				$('.datepicker').datepicker({
					'language': $(o).attr('data-language')
				});

			});
			
		}
		
		
		setTimeout(function(){
			
			$('html').removeClass('loading');
			
		}, 500);

		
		
		

		
		
		$(document).on('click', '[data-click="show-amount-form"]', function(){

			$('.has-table-control').removeClass('table-control-active');
			
			$(this).closest('.has-table-control').addClass('table-control-active');   
				
		});		
		
		
		
		$(document).on('click', '[data-click="submit-amount-form"]', function(){
				
			$(this).closest('.has-table-control').removeClass('table-control-active');
				
		});		
		
		
		
		$(document).on('click touchend', function(evt){

				var target = $(evt.target);    
				
				if ($(target).parents('.has-table-control').length > 0) {
					
					console.log(1);
					
				} else {
					
					$('.has-table-control').removeClass('table-control-active');
						
				}
				
		});		
	});
});


