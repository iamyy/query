/**
 * a jQuery alternative.
 */

;(function(){
    var _proto = Object.create(Array.prototype);

    function extend(source, target) {
    	var key;
    	for (key in source) {
    		if (source[key] !== undefined) {
    			target[key] = source[key];
    		}
    	}
    	return target;
    }

    function isHTMLElement(obj) {
    	return /HTML\w+/.test({}.toString.call(obj));
    }

    function isWindow(obj) {
    	return obj === window;
    }

    function newProto() {
    	var result = Object.create(_proto);
    	result.length = 0;
    	return result;
    }

    function isProto(x) {
    	Object.getPrototypeOf(x) === _proto;
    }

    function doForEach(els, result, handler) {
    	if (els && els.length) {
    		els.forEach(function(el, index, arr) {

    			handler.call(els, el, index, arr);
    			result[index] = el;
    		});
    		result.length = els.length
    	}
    	return result;
    }

    var specialEvents = {
    	mousemove: "MouseEvents",
    	mouseup: "MouseEvents",
    	mousedown: "MouseEvents",
    	click: "MouseEvents"
    }

    var focusEvents = {
    	focus: 'focus',
    	blur: 'blur'
    }

    _proto = extend({
    	find: function(selector) {

    		// 结果对象的原型都是 _proto
    		var result = newProto();

    		if (isProto(selector)) {

    			result[0] = selector;
    			result.length = 0;

    		} else if (isWindow(selector) || isHTMLElement(selector)) {
    			result[0] = selector;
    			result.length = 1;
    		} else {

    			var el = this[0];

    			var dom = (el || document).querySelectorAll(selector);

    			dom.forEach(function(d, i, arr) {
    				result[i] = d;
    			});

    			result.length = dom.length;
    		}

    		return result;
    	},
    	parents: function(selector) {

    		var result = newProto();

    		var el = this[0];

    		if (el) {
    			var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    			el = el.parentElement;
    			while (el) {

    				if (matchesSelector.call(el, selector)) {
    					result[0] = el;
    					result.length = 1;
    					break;
    				} else {
    					el = el.parentElement;
    				}

    			}
    		}

    		return result;
    	},
    	addClass: function(className) {
    		return doForEach(this, newProto(), function(el) {
    			el.classList.add(className);
    		});
    	},
    	removeClass: function(className) {
    		return doForEach(this, newProto(), function(el) {
    			el.classList.remove(className);
    		});
    	},
    	hasClass: function(className) {
    		var el = this[0];

    		if (el) {
    			return el.classList.contains(className);
    		}
    		return false;
    	},
    	toggleClass: function(className) {
    		return doForEach(this, newProto(), function(el) {
    			el.classList.toggle(className);
    		});
    	},
    	on: function(eventName, handler) {
    		return doForEach(this, newProto(), function(el) {
    			el.addEventListener(eventName, handler.bind(el));
    		});
    	},
    	off: function(eventName, handler) {
    		return doForEach(this, newProto(), function(el) {
    			el.removeEventListener(eventName, handler);
    		});
    	},
    	trigger: function(eventName, buddles) {
    		return doForEach(this, newProto(), function(el) {
    			if (['focus', 'blur'].indexOf(eventName) !== -1 && typeof el[eventName] === 'function') {
    				el[eventName]();
    			} else {
    				const event = document.createEvent(specialEvents[eventName] || 'Event');
    				event.initEvent(eventName, !!buddles, true);
    				el.dispatchEvent(event);
    			}
    		});
    	},
    	blur: function() {
    		return this.trigger('blur');
    	},
    	focus: function() {
    		return this.trigger('focus');
    	},
    	click: function(handler) {
    		return this.on('click', handler);
    	},
    	next: function() {
    		var result = newProto();
    		var el = this[0];
    		if (el && el.nextElementSibling) {
    			result[0] = el.nextElementSibling;
    			result.length = 1;
    		}
    		return result;
    	},
    	prev: function() {
    		var result = newProto();
    		var el = this[0];
    		if (el && el.previousElementSibling) {
    			result[0] = el.previousElementSibling;
    			result.length = 1;
    		}
    		return result;
    	},
    	empty: function() {
    		return doForEach(this, newProto(), function(el) {
    			el.innerHTML = '';
    		});
    	},
    	eq: function(index) {
    		var result = newProto();
    		var els = this;
    		if (els && els.length && index > -1 && index < els.length) {
    			result[0] = this[index];
    			result.length = 1;
    		}
    		return result;
    	},
    	val: function(val) {
    		return doForEach(this, newProto(), function(el) {
    			el.value = val;
    		});
    	},
    	hide: function() {
    		return doForEach(this, newProto(), function(el) {
    			el.style.display = 'none';
    		});
    	},
    	show: function() {
    		return doForEach(this, newProto(), function(el) {
    			el.style.display = 'block';
    		});
    	}

    }, _proto);

    return window.$$ = _proto;

})();

