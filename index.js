'use strict';

module.exports = iterable => {
	return new Proxy(iterable, {
		get(target, property) {
			return function (...args) {
				const ret = [];

				let i = 0;
				for (const item of target) {
					i++;

					if (typeof item[property] === 'undefined') {
						throw new TypeError(`Item ${i} of the iterable is missing the ${property}() method`);
					}

					ret.push(Reflect.apply(item[property], item, args));
				}

				return ret;
			};
		}
	});
};
