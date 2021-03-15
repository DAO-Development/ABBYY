+function(){
	$(function() {
		$('.dropdown-toggle').dropDown({
			thisClass: 'dropdown-toggle',
			activeClass: 'opened',
			droppedClass: 'dropdown-menu',
			parentClass: 'dropdown'
		});

		//var menuRow = $('.menu-row');
		//var menuSections = menuRow.find('.menu-section');
		//menuSections.each(function () {
		//	$(this).mouseover(function () {
		//		menuSections.each(function () {
		//			$(this).addClass('out-section');
		//		});
		//		$(this).removeClass('out-section');
		//	});
		//});
		//menuRow.each(function () {
		//	$(this).mouseout(function () {
		//		menuSections.each(function () {
		//			$(this).removeClass('out-section');
		//		});
		//	});
		//});

	});
}();
