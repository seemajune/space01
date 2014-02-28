Polyworks.Utils = (function() {
	var utils = {};

	utils.each = function(list, callback, context) {
		if(Array.isArray(list)) {
			var length = list.length;
			for(var i = 0; i < length; i++) {
				callback.call(context, list[i], i, list);
			}
		} else {
			for(var key in list) {
				callback.call(context, list[key], key, list);
			}
		}
	};
	
	utils.clone = function(obj) {
	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;

	    // Handle Date
	    if (obj instanceof Date) {
	        var copy = new Date();
	        copy.setTime(obj.getTime());
	        return copy;
	    }

	    // Handle Array
	    if (obj instanceof Array) {
	        var copy = [];
	        for (var i = 0, len = obj.length; i < len; i++) {
	            copy[i] = Polyworks.Utils.clone(obj[i]);
	        }
	        return copy;
	    }

	    // Handle Object
	    if (obj instanceof Object) {
	        var copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = Polyworks.Utils.clone(obj[attr]);
	        }
	        return copy;
	    }

	    throw new Error("Unable to copy obj! Its type isn't supported.");	
	};

	utils.extend = function(a, b) {
		for(var key in b) {
			if(b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		} 
		return a;
	};

	utils.extract = function(obj, prop) {
		var a = obj[prop];
		if(obj !== window) { delete obj[prop]; }
		return a;
	};

	utils.has = function(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	};
	
	utils.objLength = function(obj) {
		var length = 0;
		for(var key in obj) {
			// if(obj.hasOwnProperty(key)) { length++; }
			if(Utils.has(obj, key)) { length++; }
		}
		return length;
	};

	utils.mixin = function(c, p) {
	    for(var k in p) if(p[k]) c[k] = p[k];
	};

	utils.bind = function(o, f) {
	    return function() { return f.apply(o, arguments); };
	};

	utils.inherits = function(c, p) {
	    this.mixin(c, p);
	    function f() { this.constructor = c; };
	    f.prototype = c._super = p.prototype;
	    c.prototype = new f();
	};

	utils.defineGetter = function(obj, prop, func) {
		Object.defineProperty(obj, prop, {
			get: function() {
				func();
			}
		});
	};
	
	utils.defineSetter = function(obj, prop, func) {
		Object.defineProperty(obj, prop, {
			set: function(val) {
				func(val);
			}
		});
	};
	
	utils.isInView = function(pos) {
		if(pos.x > 0 && pos.x < stageConfig.width && pos.y > 0 && pos.y < stageConfig.height) {
			return true;
		} else {
			return false;
		}
	};
	
	utils.parseMarkup = function(str, reference) {
		var parsedString = str;
		// trace('Utils/parseMarkup, str = ' + str + ', reference = ');
		// trace(reference);
		if(str.indexOf('~{') > -1) {
			var pattern = /~\{[A-Z]*\}~/gi;
			var patternMatch = str.match(pattern);

			if(patternMatch) {
				for (var matchNum in patternMatch) {
					var match = String(patternMatch[matchNum]);

					var matchLength = match.length;
					var matchKey = match.substring(2, matchLength - 2);
					var output = reference[matchKey];
					// trace('output = ' + output);
					if(output === undefined || output === null) {
						output = match;
					} else {
						output = output.toString();
					}
					parsedString = parsedString.replace(match, output);
				}
				//trace(parsedString);
			} else {
				parsedString = null;
			}
		}

		return parsedString;
	};
	
	utils.addSprite = function(params) {
		var sprite;
		if(params.parentType === 'group') {
			sprite = this.addSpriteToGroup(params);
		} else {
			sprite = this.addSpriteToGame(params); // default, parentType = game or undefined
		}
		return sprite;
	};
	
	utils.addSpriteToGame = function(params) {
		return PolyworksGame.phaser.add.sprite(params.start.x, params.start.y, params.img);
	};
	
	utils.addSpriteToGroup = function(params) {
		return params.group.create(params.start.x, params.start.y, params.img);
	};
	
	utils.moveView = function(sprite, movement, params) {
		switch(movement.type) {
			case Polyworks.MovementTypes.DIRECTIONAL_BY_SPEED:
				this.moveDirectionalBySpeed(sprite, movement, params.direction);
			break;

			case Polyworks.MovementTypes.GROUNDED_DIRECTIONAL_BY_SPEED:
				if(sprite.body.touching.down) {
					this.moveDirectionalBySpeed(sprite, movement, params.direction);
				}
			break;

			default: 
			console.log('WARNING: unknown movement type: ' + movement.type);
			break;
		}
	};
	
	utils.moveDirectionalBySpeed = function(sprite, movement, direction) {
		switch(direction) {
			case Polyworks.Directions.LEFT: 
			sprite.x -= movement.speed;
			break;

			case Polyworks.Directions.RIGHT:
			sprite.x += movement.speed;
			break;

			case Polyworks.Directions.UP:
			sprite.x -= movement.speed;
			break;

			case Polyworks.Directions.DOWN: 
			sprite.y += movement.speed;
			break;

			default: 
			// trace('WARNING: unknown movement direction: ' + direction);
			break;
		}
	};

	utils.loadScript = function(url, evt) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');

        if(scriptTag.readyState) {
            scriptTag.onreadystatechange = function() {
                if(scriptTag.readyState == 'loaded' || scriptTag.readyState == 'complete') {
                    // callback.call(evt);
					Polyworks.EventCenter.trigger(evt);
                }
            };
        } else {
            scriptTag.onload = function() {
                // callback.call(evt);
				Polyworks.EventCenter.trigger(evt);
            };
        }
        scriptTag.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
	};

	return utils;
}());
