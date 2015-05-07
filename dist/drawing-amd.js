define('drawing-logic',['jquery'],
function ($) {

	// DRAWING CONSTRUCTOR AND PROTOTYPE

	var Drawing = function (element, options) {

		this.$element = $(element);
		this.options = options;

	};

	Drawing.prototype = /** @lends drawing.prototype */ {

		constructor: Drawing,

		/**
		 * @desc Set the drawing to an enabled ui state
		 * @fires enabled.fu.drawing
		 * @example
		 * $('#div').drawing('enable');
		*/
		enable: function () {

			// TODO ADD ENABLE CODE

			this.$element.trigger('enabled.fu.drawing');
		},

		/**
		 * @desc Set the drawing to a disabled ui state
		 * @example
		 * $('#div').drawing('disable');
		*/
		disable: function () {

			// TODO ADD DISABLE CODE

			this.$element.trigger('disabled.fu.drawing');
		},

		/**
		 * @desc Removes the drawing functionality completely. This will return the element back to its original state.
		 * @example
		 * $('#div').drawing('destroy');
		*/
		destroy: function () {

			// TODO ADD DESTROY CODE

			this.$element.trigger('destroyed.fu.drawing');
		},

		/**
		 * First derivative of quadratic formula - Find the tangent slope
		 * @param {Number} t 0-1
		 * @param {Number} p0 Start point
		 * @param {Number} p1 Control point
		 * @param {Number} p2 End point
		 */
		_firstDerivative: function _firstDerivative(t, p0, p1, p2) {
			return 2 * (p0 - 2 * p1 + p2) * t - 2 * (p0 - p1);
		},

		/**
		 * Quadratic formula used to draw a curve with a start point, end point, and control point
		 * @param {Number} t 0-1
		 * @param {Number} p0 Start point
		 * @param {Number} p1 Control point
		 * @param {Number} p2 End point
		 */
		_formula: function _formula(t, p0, p1, p2) {
			var x = 1 - t;

			return p0 * Math.pow(x, 2) + 2 * p1 * x * t + p2 * Math.pow(t, 2);
			// return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
		}
	};

	return Drawing;
});


define('drawing',['drawing-logic', 'jquery'], function (Drawing, $) {

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

