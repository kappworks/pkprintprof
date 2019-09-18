// ЗАГРУЗКА ФАЙЛОВ

(function ($) {

	// Browser supports HTML5 multiple file?
	var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
		isIE = /msie/i.test(navigator.userAgent);

	$.fn.customFile = function () {

		return this.each(function () {

			var $file = $(this).addClass('customfile'), // the original file input
				$wrap = $('<div class="customfile-wrap">'),
				placeholder = (typeof ($file.attr('placeholder')) !== 'undefined') ? $file.attr('placeholder') : 'Загрузить реквизиты файлом',
				$input = $('<input type="text" class="customfile-filename input small" placeholder="' + placeholder + '"/>'),
				// Button that will be used in non-IE browsers
				$button = $('<button type="button" class="customfile-upload choose-file"></button>'),
				// Hack for IE
//					$label = $('<label class="customfile-upload add-file" for="' + $file[0].id + '">Добавить еще файл</label>');
				$label = $('<label class="customfile-upload choose-file" for="' + $file[0].id + '"></label>'),
				$fileName = $(this).data('filename');

			if(typeof $fileName !== 'undefined') {
				$input.val($fileName);
			}
			// Hide by shifting to the left so we
			// can still trigger events
			$file.css({
				position: 'absolute',
				left: '-9999px'
			});

			$wrap.insertAfter($file)
				.append($file, $input, (isIE ? $label : $button));

			// Prevent focus
			$file.attr('tabIndex', -1);
			$button.attr('tabIndex', -1);

			$button.click(function () {
				$file.focus().click(); // Open dialog
			});

			$input.click(function () {
				$file.focus().click(); // Open dialog
			});

			$file.change(function () {

				var files = [], fileArr, filename;

				// If multiple is supported then extract
				// all filenames from the file array
				if (multipleSupport) {
					fileArr = $file[0].files;
					for (var i = 0, len = fileArr.length; i < len; i++) {
						files.push(fileArr[i].name);
					}
					filename = files.join(', ');

					// If not supported then just take the value
					// and remove the path to just show the filename
				} else {
					filename = $file.val().split('\\').pop();
				}

				$input.val(filename) // Set the value
					.attr('title', filename) // Show filename in title tootlip
					.focus(); // Regain focus

			});

			$input.on({
				blur: function () {
					$file.trigger('blur');
				},
				keydown: function (e) {
					if (e.which === 13) { // Enter
						if (!isIE) {
							$file.trigger('click');
						}
					} else if (e.which === 8 || e.which === 46) { // Backspace & Del
						// On some browsers the value is read-only
						// with this trick we remove the old input and add
						// a clean clone with all the original events attached
						$file.replaceWith($file = $file.clone(true));
						$file.trigger('change');
						$input.val('');
					} else if (e.which === 9) { // TAB
						return;
					} else { // All other keys
						return false;
					}
				}
			});

		});

	};

	// Old browser fallback
	if (!multipleSupport) {
		$(document).on('change', 'input.customfile', function () {

			var $this = $(this),
				// Create a unique ID so we
				// can attach the label to the input
				uniqId = 'customfile_' + (new Date()).getTime(),
				$wrap = $this.parent(),
				// Filter empty input
				$inputs = $wrap.siblings().find('.customfile-filename')
					.filter(function () {
						return !this.value
					}),
				$file = $('<input type="file" id="' + uniqId + '" name="' + $this.attr('name') + '"/>');

			// 1ms timeout so it runs after all other events
			// that modify the value have triggered
			setTimeout(function () {
				// Add a new input
				if ($this.val()) {
					// Check for empty fields to prevent
					// creating new inputs when changing files
					if (!$inputs.length) {
						$wrap.after($file);
						$file.customFile();
					}
					// Remove and reorganize inputs
				} else {
					$inputs.parent().remove();
					// Move the input so it's always last on the list
					$wrap.appendTo($wrap.parent());
					$wrap.find('input').focus();
				}
			}, 1);

		});
	}





}(jQuery));

















jQuery(document).ready(function () {

	$('.quant-orders__item').on('click', function () {
		var _this = $(this);
		_this.addClass('active').siblings().removeClass('active')
	});

	$('.pagination-item').on('click', function () {
		var _this = $(this);
		_this.addClass('active').siblings().removeClass('active')
	});



	/// styler

	$('.select-styler, .radio').styler();


	///daterange

	$(".input-cal").daterangepicker({
		"locale": {
			"format": "DD.MM.YYYY",
			"separator": " - ",
			"applyLabel": "Применить",
			"cancelLabel": "Отмена",
			"fromLabel": "От",
			"toLabel": "До",

			// "customRangeLabel": "Свой",
			"daysOfWeek": [
				"Вс",
				"Пн",
				"Вт",
				"Ср",
				"Чт",
				"Пт",
				"Сб"
			],
			"monthNames": [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь"
			],
			"firstDay": 1
		}
	});

	$('.input-cal').val('Фильтр по дате');

	$(".input-cal-simple").daterangepicker({
		"singleDatePicker": true,
		"locale": {
			"format": "DD.MM.YYYY",
			"separator": " - ",
			"applyLabel": "Применить",
			"cancelLabel": "Отмена",
			"fromLabel": "От",
			"toLabel": "До",
			"parentEl": ".input-cal__wrap",

			// "customRangeLabel": "Свой",
			"daysOfWeek": [
				"Вс",
				"Пн",
				"Вт",
				"Ср",
				"Чт",
				"Пт",
				"Сб"
			],
			"monthNames": [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь"
			],
			"firstDay": 1
		}
	});

	$('.input-cal').val('Фильтр по дате');




	///

	$('.table__block-title-wrap').on('click', function () {
		var _this = $(this);
		_this.toggleClass('active');
		_this.parents('.table__block').children('.table-wrap').slideToggle()
	});




	$(".tabs-item").on('click', function () {
		var itemThumbs = $(this).attr('data-thumb'),
			blockThumbs = $(".page__block[data-thumb= '" + itemThumbs + "']");
		$(this).addClass('active').siblings().removeClass('active');
		blockThumbs.addClass('active').siblings().removeClass('active');
	});



	$(function () {
		$(".input-tel").mask("+ 7 (999) 999-99-99");
	});



	$('input[type=file]').customFile();

	// добвление и удаление файлов
	$('.add-file').click(function () {
		var $prevInputFiles = $(this).parent().find('input[type=file]');
		if ($prevInputFiles.length < 6) {
			var $prevInputFile = $prevInputFiles.eq(0);
			var position = $prevInputFiles.length;
			if ($prevInputFiles.filter('[data-position="' + position + '"]').length) {
				for (var i = 1; i < 6; i++) {
					if (!$prevInputFiles.filter('[data-position="' + i + '"]').length) {
						position = i;
						break;
					}
				}
			}
			var $insertAfter = $prevInputFiles.last().parent();
			if ($insertAfter.next('.add-file').length) {
				$insertAfter = $insertAfter.next();
			}
			var $inputFile = $('<input type="file" name="' + $prevInputFile.attr('name').replace('commfile1]', 'commfile' + (position+1) + ']') + '" data-position="' + position + '" placeholder="' + $prevInputFile.attr('placeholder') + '" id="customfiles' + position + '" />').insertAfter($insertAfter).customFile();
			$inputFile.next().after('<span class="del-file"></span>');
			$('.del-file').click(function () {
				$(this).closest('.customfile-wrap').remove();
			});




		}
	});


	//

	$(".nomen__block-label").on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
	});


	///
	$(".change-name").on('click', function (e) {
		e.preventDefault();
		$(this).parents(".order-title__wrap").addClass('active');
	});

	$(".change-save, .change-cancel").on('click', function (e) {
		e.preventDefault();
		$(this).parents(".order-title__wrap").removeClass('active');
	});


	///
	$(".button-continue").on('click', function () {
		$(".order_new__stage-one").removeClass('active');
		$(".order_new__stage-two").addClass('active');
	});
	$(".change-nomin ").on('click', function () {
		$(".order_new__stage-one").addClass('active');
		$(".order_new__stage-two").removeClass('active');
	});


	//

	$( ".order-upload-button" ).click(function(){ // задаем функцию при нажатиии на элемент <button>
		$( ".order-upload-input" ).click(); // вызываем событие click на элементе <div>
	});

	/// кликабельные строки таблицы

	$('.table-clickable tbody tr[data-href]').addClass('clickable').click( function() {
		window.location = $(this).attr('data-href');
	}).find('a').hover( function() {
		$(this).parents('tr').unbind('click');
	}, function() {
		$(this).parents('tr').click( function() {
			window.location = $(this).attr('data-href');
		});
	});
///


	$( ".button-dropdown" ).on('click', function(){
		var parent = $(this).parents('.table__order-tr__finance-header').toggleClass('active');
		parent.next(".table__order-tr").find(".table__order-tr__dropdown").slideToggle();
	});


	////


	$('.img-quest').tooltip({
		html:true,
		placement: 'right',
		template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner">sdaasdasdas</div></div>',

	});

	/// scroll
	$("body").on('click', '.warning__block .button-red', function(e){
		var fixed_offset = 0;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	});




});
















