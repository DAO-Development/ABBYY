+function() {
	$(function() {

		var form = $('.header-search');
		var button = $('.header-search .button-search-toggle');
		var openedClass = 'header-search-opened';
		
		var stopPropagation = false;

		button.click(function(){
			if(!form.hasClass(openedClass)) {
				open();
			}
			else {
				close();
			}
		});

		// клик по body закрывает форму
		$('body').click(function() {
			if (!stopPropagation)
			{
				close();
			}
			stopPropagation = false;
		});

		form.click(function() {
			stopPropagation = true;
		});

		function open() {
			form.addClass(openedClass);
		}

		function close() {
			form.removeClass(openedClass);
		}
	});
}();
