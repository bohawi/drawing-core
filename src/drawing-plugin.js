
define(['drawing-logic', 'jquery'], function (Drawing, $) {

	// DRAWING PLUGIN DEFINITION

	var old = $.fn.drawing;

	/**
	 * @name drawing
	 * @constructor
	 * @classdesc the core module for drawing stuff






	*/

	$.fn.drawing = function (option, value) {

		var methodReturn;

		var $set = this.each(function () {

			var $this = $(this);
			var data = $this.data('drawing');
			var options = typeof option === 'object' && option;

			if (!data) {
				$this.data('drawing', (data = new Drawing(this, $.extend(true, {}, $.fn.drawing.defaults, options))));
			}

			if (typeof option === 'string') {
				methodReturn = data[option](value);
			}
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.drawing.defaults = {};

	$.fn.drawing.Constructor = Drawing;

	/**
	 * @name drawing#noConflict
	 * @function
	 * @desc Prevent the drawing from overriding an existing version of $.fn.drawing
	 * @returns a self contained version of the ET Element drawing
	 * @example
	 * var etElement = $.fn.drawing.noConflict();
	 */
	$.fn.drawing.noConflict = function () {
		$.fn.drawing = old;
		return this;
	};

});
