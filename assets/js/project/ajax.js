
$(document).ajaxStart(function(){
	
	// ajaxProgressShow();
	
}).ajaxStop(function(){
	
	// ajaxProgressHide();
	
});

	
function ajaxProgressShow() {

	if ($('html').hasClass('ajax-loading') == false) {
		
		$('html').addClass('ajax-loading');
	
	}

}

function ajaxProgressHide() {
	
	if ($('html').hasClass('ajax-loading') == true) {
	
		setTimeout(function(){
			
			$('html').removeClass('ajax-loading');
			
		}, 700);
		
	}
}



//
// ajax form processor
//
function ajaxSubmit(formObject, successCallback){

	if (typeof formObject != 'object') {
		var formObject = $(formObject);
	}

	// remove states and messages from previous request
	$(formObject).find('.ajax-form-parse-error, .alert, .help-block-dynamic').remove();
	$(formObject).find('.form-group').removeClass('has-error').removeClass('has-waning').removeClass('has-success');

	var formPostUrl = $(formObject).attr('data-url');
	var postParams = $(formObject).serialize();
	
	
	
	$.post(formPostUrl, postParams, function(json){
	
		if (typeof json.status != 'undefined') {

		
			if (json.status == true) {

				ajaxModalClose();
				
			} else if (json.status == false) {

			
				if (typeof json.global_messages !== 'undefined' && json.global_messages.length > 0) {

					$(json.global_messages).each(function(i, msg){
						
						if (typeof msg.error_message != 'undefined') {
							
							$(msg.destination).prepend('<div class="alert alert-danger" role="alert">' + msg.error_message + '</div>');
						
						}
						
					});
					
				}
				

				if (typeof json.field_messages !== 'undefined' && json.field_messages.length > 0) {
					
					$(json.field_messages).each(function(i, msg){
						
						if (typeof msg.field != 'undefined') {
							
							var this_form_group = $('.form-control[name="' + msg.field + '"]').closest('.form-group');
								
							this_form_group.addClass('has-error');
								
							if (typeof msg.error_message != 'undefined') {

								if (msg.error_message != '')
								this_form_group.append('<div class="help-block help-block-dynamic">' + msg.error_message + '</div>');
								
							}
							
						}
						
					});
					
				}

			}
			

			
			if (typeof successCallback == 'function') {
				successCallback(json); 
			}
			
		
		}
			
	}, 'json');
	
}






//
// perform ajax action without a form
//
function ajaxAction(requestUrl, postParams, successCallback){

	if (typeof postParams != 'object') {
		var postParams = {};
	}

	$.post(requestUrl, postParams, function(json){
	
		if (typeof json.status != 'undefined') {

			if (json.status == true) {

				if (typeof successCallback == 'function') {
					successCallback(json); 
				}
			
			} else if (json.status == false) {

				if (typeof json.global_messages !== 'undefined' && json.global_messages.length > 0) {
					
					var messageHtml = '';
					
					$(json.global_messages).each(function(i, msg){
						 
						if (typeof msg.error !== 'undefined') {
							messageHtml += '<div class="alert alert-danger" role="alert">' + msg.error + '</div>';
						}
						
					});
					
					showModalMessage(messageHtml);
					
				}
				
			}
			
		}
				
			
	}, 'json');
	
}





//
// load ajax modal
//
function ajaxModal(requestUrl, postParams, successCallback){

	if (typeof postParams != 'object') {
		var postParams = {};
	}
	
	$.post(requestUrl, postParams, function(httpResponse){
		
		var modalHtml = "\
		<div class=\"modal fade\" id=\"ajax-modal\" role=\"dialog\">\
			<div class=\"modal-dialog\">\
				<div class=\"modal-content\">\
					" + httpResponse + " \
				</div>\
			</div>\
		</div>"; 
		 
		$('body').append(modalHtml);
		
		$('#ajax-modal .form-control, #ajax-modal input[type=checkbox], #ajax-modal input[type=radio]').each(function(i,o){
			
			if (typeof $(o).attr('existing-value') != 'undefined') {
				
				if (($(o).attr('type') == 'checkbox' || $(o).attr('type') == 'radio') && $(o).attr('existing-value') == '1') {
					
					$(o).prop('checked', true);
					$(o).trigger('change');
					
				} else {
					
					$(o).val($(o).attr('existing-value'));
					$(o).trigger('change');
					
				}
				
				
				
			}
			
		});
		
		$('#ajax-modal').modal();
			
		$(document).on('hide.bs.modal','#ajax-modal', function () {
			$('#ajax-modal').remove();
		});
		
		if (typeof successCallback == 'function') {
			successCallback(); 
		}
		
	}).done(function() {
	


	})
	.fail(function() {
		
		showModalMessage('<div class="alert alert-danger">AJAX request to ' + requestUrl + ' has failed!</div>');
		
	})
	.always(function() {
		
	});
	
}


function ajaxModalClose(){

	$('#ajax-modal').modal('hide')
	$('#ajax-modal').remove();

}



function showModalMessage(messageHtml){
	
	var modalHtml = "\
	<div class=\"modal fade\" id=\"notification-modal\" role=\"dialog\">\
		<div class=\"modal-dialog\">\
			<div class=\"modal-content\">\
			\
				<div class=\"modal-header\">\
				  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\
				  <h4 class=\"modal-title\"></h4>\
				</div>\
				\
				<div class=\"modal-body\">\
				" + messageHtml + " \
				</div>\
			<!--	<div class=\"modal-footer\">\
					<div class=\"text-right\">\
						<button type=\"button\" class=\"btn btn-default btn-default\" data-dismiss=\"modal\"><span class=\"fa fa-close\"></span> Ok</button>\
					</div>\
				</div>-->\
					\
			</div>\
		</div>\
	</div>"; 
	 
	$('body').append(modalHtml);
	
	$('#notification-modal').modal();
	
	$(document).on('hide.bs.modal','#notification-modal', function () {
		$('#notification-modal').remove();
	});
	
}



		
	