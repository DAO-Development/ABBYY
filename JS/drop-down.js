(function( $ ) {
	$.fn.dropDown = function (params) {

		params = params || {};
		// кнопка
		var thisClass = params.thisClass || 'drop-down';
		// активное состояние кнопки
		var activeClass = params.activeClass || 'active';
        // выпадающий контейнер
		var droppedClass = params.droppedClass || 'dropped';

		var parentClass = params.parentClass;

		// активное состояние контейнера
		var droppedOpenedClass = params.droppedOpenedClass || 'dropped-opened';
		// активное состояние контейнера
		var droppedClosedClass = params.droppedClosedClass || 'dropped-opened';
		// css/js анимация
		var cssAnimation = params.cssAnimation;

		var dropped = '.' + droppedClass;
		var selector = '.' + thisClass;
		var parent = parentClass ? '.' + parentClass : null;

		var stopPropagation = false;

		$.fn.animateOpen = function() {
			if(cssAnimation) {
				this.removeClass(droppedClosedClass);
				this.addClass(droppedOpenedClass);
			}
			else {
				this.slideDown();
			}
			return this;
		};

		$.fn.animateClose = function() {
			if(cssAnimation) {
				this.removeClass(droppedOpenedClass);
				this.addClass(droppedClosedClass);
			}
			else {
				this.slideUp();
			}
			return this;
		};

		function close() {

			var $dropped = $(dropped);
			var $parent = parent ? $dropped.parents(parent) : $dropped.parent();

			$dropped.animateClose();
			$parent.find(selector).removeClass(activeClass);
		}

		function open(toggle) {
			var $toggle = $(toggle)
			var $parent = parent ? $toggle.parents(parent) : $toggle.parent();

			$toggle.addClass(activeClass)
			$parent.find(dropped).animateOpen();
		}

		// открытие|закрытие drop-down:
		this.click(function(e){

			// отключаем переход по ссылкам
			e.preventDefault();

			// определяем открыт текущий пункт или нет
			var $parent = parent ? $(this).parents(parent) : $(this).parent();
			var state = $parent.find(dropped).is(':visible');

			// закрываем все
			close();

			// если текущий не был открыт, открываем его
			if (!state) {
				open(this);
			}
		});

		// клик по body закрывает drop-down
		$('body').click(function(){
			if (!stopPropagation)
			{
				close();
			}
			stopPropagation = false;
		});

		// клик по drop-down останавливает всплытие (отменяет клик по body)
		// event.stopPropagation не используется, т.к. может конфликтовать с другим кодом
		this.click(function(){
			stopPropagation = true;
		});

		$(dropped).click(function(){
			stopPropagation = true;
		});
	}
})(jQuery);
